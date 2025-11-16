import { Leaf, Target, Heart, Users, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const team = [
  {
    name: "Sarah Green",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
  },
  {
    name: "Michael Earth",
    role: "Head of Sustainability",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300",
  },
  {
    name: "Emily Ocean",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
  },
  {
    name: "David Forest",
    role: "Community Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make sustainable living accessible to everyone by connecting conscious consumers with eco-friendly products and communities.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We believe in transparency, sustainability, and community. Every product is carefully vetted for environmental impact.",
  },
  {
    icon: Users,
    title: "Our Community",
    description:
      "Join 50,000+ eco-warriors making a difference. Together, we've planted 100,000 trees and saved tons of plastic waste.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#2E8B57] to-[#3CB371]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Leaf className="w-4 h-4 text-white" />
              <span className="text-white">About EcoBazaarX</span>
            </div>
            <h1 className="text-5xl text-white mb-6">
              Building a Sustainable Future Together
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We're on a mission to make eco-friendly living simple, accessible, and impactful for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#f5f5dc]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-border text-center"
              >
                <div className="w-16 h-16 bg-[#2E8B57]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[#2E8B57]" />
                </div>
                <h3 className="text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  EcoBazaarX was founded in 2020 with a simple yet powerful vision: to create a
                  marketplace where sustainability meets convenience. We saw the growing need for a
                  platform that not only offers eco-friendly products but also fosters a community
                  of like-minded individuals passionate about protecting our planet.
                </p>
                <p>
                  Today, we've grown into a thriving community of over 50,000 members who have
                  collectively made a significant environmental impact. From planting trees to
                  reducing plastic waste, every purchase on EcoBazaarX contributes to a greener
                  future.
                </p>
                <p>
                  We carefully vet every product and seller on our platform to ensure they meet our
                  strict sustainability standards. Our commitment goes beyond commerce – we're
                  building a movement.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1624555130296-e551faf8969b?w=800"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#f5f5dc]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals dedicated to making sustainable living accessible to everyone
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border text-center hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-foreground mb-1">{member.name}</h4>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as
                soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#2E8B57]" />
                  </div>
                  <div>
                    <h4 className="text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">hello@ecobazaarx.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#2E8B57]" />
                  </div>
                  <div>
                    <h4 className="text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#2E8B57]" />
                  </div>
                  <div>
                    <h4 className="text-foreground mb-1">Address</h4>
                    <p className="text-muted-foreground">
                      123 Green Street
                      <br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h3 className="text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-1 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1 rounded-xl" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="mt-1 rounded-xl" />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    className="mt-1 min-h-[120px] rounded-xl"
                  />
                </div>

                <Button className="w-full bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
