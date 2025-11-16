import { useState } from "react";
import { Heart, MessageCircle, Share2, TrendingUp, Leaf, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const posts = [
  {
    id: "1",
    author: "Emma Green",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    username: "@emmagreen",
    time: "2 hours ago",
    content:
      "Just switched to bamboo toothbrushes and I'm loving them! Small changes make a big difference. 🌱 #EcoLiving",
    likes: 45,
    comments: 12,
    trending: true,
  },
  {
    id: "2",
    author: "John Eco",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    username: "@johneco",
    time: "5 hours ago",
    content:
      "Started a community garden in my neighborhood! Looking for tips on composting. Any experts here?",
    likes: 67,
    comments: 23,
    trending: true,
  },
  {
    id: "3",
    author: "Sarah Climate",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    username: "@sarahclimate",
    time: "1 day ago",
    content:
      "Reminder: Bring your reusable bags when shopping! I've saved hundreds of plastic bags this year.",
    likes: 89,
    comments: 18,
  },
  {
    id: "4",
    author: "Mike Sustain",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    username: "@mikesustain",
    time: "2 days ago",
    content:
      "DIY eco-friendly cleaning products are game-changers! Vinegar + baking soda = magic ✨",
    likes: 56,
    comments: 15,
  },
];

const trendingTopics = [
  { tag: "#ZeroWaste", posts: 1234 },
  { tag: "#EcoLiving", posts: 987 },
  { tag: "#Composting", posts: 654 },
  { tag: "#PlasticFree", posts: 543 },
  { tag: "#Sustainability", posts: 432 },
];

export function CommunityPage() {
  const [newPost, setNewPost] = useState("");

  return (
    <div className="min-h-screen bg-[#f5f5dc]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2">EcoBazaarX Community</h1>
          <p className="text-muted-foreground">Share tips, connect with eco-warriors, and inspire change</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Share Your EcoTip */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2E8B57]" />
                <h3 className="text-foreground">Share Your EcoTip</h3>
              </div>
              <Textarea
                placeholder="What sustainable practice are you trying today?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-4 min-h-[100px] rounded-xl"
              />
              <div className="flex justify-between items-center">
                <div className="text-muted-foreground">
                  {newPost.length}/500
                </div>
                <Button className="bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
                  Post
                </Button>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-foreground">{post.author}</h4>
                      <span className="text-muted-foreground">{post.username}</span>
                      {post.trending && (
                        <Badge variant="secondary" className="bg-[#2E8B57]/10 text-[#2E8B57]">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{post.time}</p>

                    <p className="text-foreground mb-4">{post.content}</p>

                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-[#2E8B57] transition-colors">
                        <Heart className="w-5 h-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-[#2E8B57] transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-[#2E8B57] transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#2E8B57]" />
                <h3 className="text-foreground">Community Stats</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-1">Active Members</p>
                  <p className="text-[#2E8B57]">50,234</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Posts Today</p>
                  <p className="text-[#2E8B57]">342</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Trees Planted</p>
                  <p className="text-[#2E8B57]">100,567</p>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#2E8B57]" />
                <h3 className="text-foreground">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={topic.tag}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#f5f5dc] transition-colors text-left"
                  >
                    <div>
                      <p className="text-foreground">{topic.tag}</p>
                      <p className="text-muted-foreground">{topic.posts} posts</p>
                    </div>
                    <span className="text-muted-foreground">#{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Groups */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="text-foreground mb-4">Featured Groups</h3>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-xl border border-border hover:border-[#2E8B57] transition-colors text-left">
                  <h4 className="text-foreground mb-1">Zero Waste Warriors</h4>
                  <p className="text-muted-foreground">12.3k members</p>
                </button>
                <button className="w-full p-3 rounded-xl border border-border hover:border-[#2E8B57] transition-colors text-left">
                  <h4 className="text-foreground mb-1">Urban Gardeners</h4>
                  <p className="text-muted-foreground">8.7k members</p>
                </button>
                <button className="w-full p-3 rounded-xl border border-border hover:border-[#2E8B57] transition-colors text-left">
                  <h4 className="text-foreground mb-1">Sustainable Living</h4>
                  <p className="text-muted-foreground">15.2k members</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
