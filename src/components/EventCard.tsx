import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
}

export function EventCard({ title, date, location, attendees, image, category }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group">
      <div className="relative overflow-hidden aspect-video">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-[#2E8B57] hover:bg-[#2E8B57]">
          {category}
        </Badge>
      </div>
      
      <div className="p-5">
        <h3 className="mb-3 text-foreground line-clamp-2">{title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-[#2E8B57]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-[#2E8B57]" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-[#2E8B57]" />
            <span>{attendees} attending</span>
          </div>
        </div>

        <Button className="w-full bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
          Register Now
        </Button>
      </div>
    </div>
  );
}
