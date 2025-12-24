import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const wooUrl = Deno.env.get('WOOCOMMERCE_URL');
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`WooCommerce API error: ${response.status} - ${errorText}`);
      throw new Error(`WooCommerce API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
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
