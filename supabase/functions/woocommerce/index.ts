import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const wooUrlRaw = Deno.env.get('WOOCOMMERCE_URL');
const wooUrl = wooUrlRaw?.replace(/\/+$/, ''); // Remove trailing slashes
const consumerKey = Deno.env.get('WOOCOMMERCE_CONSUMER_KEY');
const consumerSecret = Deno.env.get('WOOCOMMERCE_CONSUMER_SECRET');

function getAuthHeader(): string {
  const credentials = btoa(`${consumerKey}:${consumerSecret}`);
  return `Basic ${credentials}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { endpoint, method = 'GET', body } = await req.json();
    
    console.log(`WooCommerce API request: ${method} ${endpoint}`);
    
    if (!wooUrl || !consumerKey || !consumerSecret) {
      throw new Error('WooCommerce credentials not configured');
    }

    const apiUrl = `${wooUrl}/wp-json/wc/v3${endpoint}`;
    console.log(`Calling WooCommerce API: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader(),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    let responseText = await response.text();
    console.log(`WooCommerce raw response (first 500 chars): ${responseText.substring(0, 500)}`);
    
    // Some hosts wrap JSON in HTML tags, extract the JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      responseText = jsonMatch[0];
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`Failed to parse response as JSON: ${responseText.substring(0, 200)}`);
      throw new Error(`Invalid JSON response from WooCommerce API`);
    }

    // Check for WooCommerce API errors
    if (data.code && data.message) {
      console.error(`WooCommerce API error: ${data.code} - ${data.message}`);
      throw new Error(`WooCommerce: ${data.message}`);
    }

    if (!response.ok) {
      console.error(`WooCommerce API error: ${response.status}`);
      throw new Error(`WooCommerce API error: ${response.status} - ${response.statusText}`);
    }

    console.log(`WooCommerce API response received, items: ${Array.isArray(data) ? data.length : 'object'}`);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in woocommerce function:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
