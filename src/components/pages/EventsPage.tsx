import { EventCard } from "../EventCard";
import { Calendar, MapPin, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const events = [
  {
    title: "Community Beach Cleanup",
    date: "November 20, 2025",
    location: "Santa Monica Beach, CA",
    attendees: 124,
    image: "https://images.unsplash.com/photo-1513906029980-32d13afe6d8c?w=600",
    category: "Cleanup",
  },
  {
    title: "Urban Gardening Workshop",
    date: "November 22, 2025",
    location: "Green Community Center, NY",
    attendees: 56,
    image: "https://images.unsplash.com/photo-1513906029980-32d13afe6d8c?w=600",
    category: "Workshop",
  },
  {
    title: "Sustainable Fashion Meetup",
    date: "November 25, 2025",
    location: "EcoHub, San Francisco",
    attendees: 89,
    image: "https://images.unsplash.com/photo-1624555130296-e551faf8969b?w=600",
    category: "Meetup",
  },
  {
    title: "Zero Waste Cooking Class",
    date: "November 28, 2025",
    location: "Green Kitchen, Portland",
    attendees: 32,
    image: "https://images.unsplash.com/photo-1513906029980-32d13afe6d8c?w=600",
    category: "Workshop",
  },
  {
    title: "Plastic-Free Living Seminar",
    date: "December 1, 2025",
    location: "Eco Center, Seattle",
    attendees: 78,
    image: "https://images.unsplash.com/photo-1624555130296-e551faf8969b?w=600",
    category: "Seminar",
  },
  {
    title: "Tree Planting Drive",
    date: "December 5, 2025",
    location: "Central Park, NY",
    attendees: 234,
    image: "https://images.unsplash.com/photo-1513906029980-32d13afe6d8c?w=600",
    category: "Outdoor",
  },
];

export function EventsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5dc]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2">Eco Events Near You</h1>
          <p className="text-muted-foreground">
            Join local events and connect with like-minded eco-conscious people
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10 rounded-xl"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Location"
                className="pl-10 rounded-xl md:w-64"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="date"
                className="pl-10 rounded-xl md:w-48"
              />
            </div>
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="cleanup">Cleanups</TabsTrigger>
            <TabsTrigger value="workshop">Workshops</TabsTrigger>
            <TabsTrigger value="meetup">Meetups</TabsTrigger>
            <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cleanup">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter((e) => e.category === "Cleanup")
                .map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="workshop">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter((e) => e.category === "Workshop")
                .map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="meetup">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter((e) => e.category === "Meetup")
                .map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="outdoor">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter((e) => e.category === "Outdoor")
                .map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Map Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[#2E8B57]" />
            <h2 className="text-foreground">Event Locations</h2>
          </div>
          <div className="w-full h-96 bg-[#f5f5dc] rounded-xl flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-[#2E8B57]" />
              <p>Interactive map showing event locations</p>
              <p className="text-sm">(Map integration placeholder)</p>
            </div>
          </div>
        </div>

        {/* Create Event CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] rounded-2xl p-8 text-center">
          <h2 className="text-white mb-4">Want to Host an Event?</h2>
          <p className="text-white/90 mb-6">
            Create your own eco-event and bring your community together
          </p>
          <Button size="lg" className="bg-white text-[#2E8B57] hover:bg-white/90 rounded-xl">
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
}
