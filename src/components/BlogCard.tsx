import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
}

const BlogCard = ({ title, excerpt, date, image, slug }: BlogCardProps) => {
  return (
    <Link to={`/leituras/${slug}`} className="group block">
      <article className="h-full bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500">
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <time className="font-body text-xs text-muted-foreground uppercase tracking-wider">
            {date}
          </time>
          <h3 className="font-display text-xl text-card-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4">
            {excerpt}
          </p>
          <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
            Veja mais
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
