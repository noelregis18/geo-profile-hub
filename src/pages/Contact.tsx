
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create a mailto link with the form data
    const mailtoLink = `mailto:noel.regis04@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    
    // Open the mailto link in a new window
    window.open(mailtoLink, '_blank');
    
    toast({
      title: "Message Ready to Send",
      description: "Your email client has been opened with your message.",
    });
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  // Function to open Google Maps with the location
  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps?q=Asansol,+West+Bengal,+India', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-[#E0E0E0]">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#1ABC9C] to-blue-400 bg-clip-text text-transparent">Get in Touch</h1>
            <p className="text-xl max-w-2xl mx-auto">
              I'm always eager to learn and collaborate on new projects.
              Feel free to reach out to me 🙂
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-[#1ABC9C]">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#1ABC9C] mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:noel.regis04@gmail.com" className="hover:text-[#1ABC9C] transition-colors">
                      noel.regis04@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#1ABC9C] mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a href="tel:+917319546900" className="hover:text-[#1ABC9C] transition-colors">
                      +91 7319546900
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 cursor-pointer" onClick={openGoogleMaps}>
                  <MapPin className="w-6 h-6 text-[#1ABC9C] mt-1" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="hover:text-[#1ABC9C] transition-colors flex items-center">
                      Asansol, West Bengal, India
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-10 mb-6 text-[#1ABC9C]">Social Links</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Linkedin className="w-6 h-6 text-[#1ABC9C] mt-1" />
                  <div>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/noel-regis-aa07081b1/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#1ABC9C] transition-colors flex items-center"
                    >
                      Connect with me <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Github className="w-6 h-6 text-[#1ABC9C] mt-1" />
                  <div>
                    <h3 className="font-semibold">GitHub</h3>
                    <a 
                      href="https://github.com/noelregis18" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#1ABC9C] transition-colors flex items-center"
                    >
                      See my code <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Twitter className="w-6 h-6 text-[#1ABC9C] mt-1" />
                  <div>
                    <h3 className="font-semibold">Twitter</h3>
                    <a 
                      href="https://x.com/NoelRegis8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#1ABC9C] transition-colors flex items-center"
                    >
                      Follow me <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <ExternalLink className="w-6 h-6 text-[#1ABC9C] mt-1" />
                  <div>
                    <h3 className="font-semibold">Topmate</h3>
                    <a 
                      href="http://topmate.io/noel_regis" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#1ABC9C] transition-colors flex items-center"
                    >
                      Schedule a meeting <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg animate-fade-in delay-150">
              <h2 className="text-2xl font-bold mb-6 text-[#1ABC9C]">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-[#2d2d2d] border-[#3d3d3d] text-[#E0E0E0] focus:border-[#1ABC9C]"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                    className="w-full bg-[#2d2d2d] border-[#3d3d3d] text-[#E0E0E0] focus:border-[#1ABC9C]"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject of your message"
                    className="w-full bg-[#2d2d2d] border-[#3d3d3d] text-[#E0E0E0] focus:border-[#1ABC9C]"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message"
                    className="w-full bg-[#2d2d2d] border-[#3d3d3d] text-[#E0E0E0] focus:border-[#1ABC9C]"
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#1ABC9C] hover:bg-[#16a085] text-white transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
