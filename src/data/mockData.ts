
import { Profile } from "../types";

export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Software Engineer with expertise in full-stack development, specializing in React, Node.js, and cloud technologies.",
    address: {
      street: "42 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560001",
      country: "India",
      coordinates: {
        lat: 12.9716,
        lng: 77.5946
      }
    },
    contactInfo: {
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      website: "rajeshkumar.dev"
    },
    tags: ["Software", "React", "Cloud"],
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-06-20T16:30:00Z",
    interests: ["Photography", "Hiking", "Cricket"]
  },
  {
    id: "2",
    name: "Priya Sharma",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "UX Designer with 5+ years of experience creating user-centric digital products for startups and enterprise clients.",
    address: {
      street: "15 Linking Road",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400050",
      country: "India",
      coordinates: {
        lat: 19.0760,
        lng: 72.8777
      }
    },
    contactInfo: {
      email: "priya.sharma@example.com",
      phone: "+91 87654 32109"
    },
    tags: ["Design", "UX", "Product"],
    createdAt: "2023-02-10T10:15:00Z",
    updatedAt: "2023-05-18T14:45:00Z",
    interests: ["Painting", "Travel", "Yoga"]
  },
  {
    id: "3",
    name: "Amit Patel",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Data Scientist focusing on machine learning algorithms and predictive analytics for the fintech industry.",
    address: {
      street: "78 Salt Lake",
      city: "Kolkata",
      state: "West Bengal",
      zip: "700091",
      country: "India",
      coordinates: {
        lat: 22.5726,
        lng: 88.3639
      }
    },
    contactInfo: {
      email: "amit.patel@example.com",
      phone: "+91 76543 21098",
      website: "amitpatel.ai"
    },
    tags: ["Data Science", "ML", "Analytics"],
    createdAt: "2023-03-05T09:30:00Z",
    updatedAt: "2023-07-12T11:20:00Z",
    interests: ["Chess", "Reading", "Classical Music"]
  },
  {
    id: "4",
    name: "Kavita Reddy",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Marketing Specialist with expertise in digital campaigns and growth strategies for e-commerce businesses.",
    address: {
      street: "22 Jubilee Hills",
      city: "Hyderabad",
      state: "Telangana",
      zip: "500033",
      country: "India",
      coordinates: {
        lat: 17.3850,
        lng: 78.4867
      }
    },
    contactInfo: {
      email: "kavita.reddy@example.com",
      phone: "+91 65432 10987"
    },
    tags: ["Marketing", "Digital", "E-commerce"],
    createdAt: "2023-01-25T15:45:00Z",
    updatedAt: "2023-06-30T13:10:00Z",
    interests: ["Dancing", "Cooking", "Fashion"]
  },
  {
    id: "5",
    name: "Vikram Singh",
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Project Manager with 8+ years leading cross-functional teams in IT and infrastructure projects.",
    address: {
      street: "9 Sector 18",
      city: "Chandigarh",
      state: "Punjab",
      zip: "160018",
      country: "India",
      coordinates: {
        lat: 30.7333,
        lng: 76.7794
      }
    },
    contactInfo: {
      email: "vikram.singh@example.com",
      phone: "+91 54321 09876",
      website: "vikramsingh.pm"
    },
    tags: ["Project Management", "Agile", "Leadership"],
    createdAt: "2023-04-12T08:20:00Z",
    updatedAt: "2023-08-05T16:50:00Z",
    interests: ["Cycling", "Documentaries", "Gardening"]
  },
  {
    id: "6",
    name: "Noel Regis",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Full Stack Developer specializing in building scalable web applications with modern JavaScript frameworks.",
    address: {
      street: "27 Burnpur Road",
      city: "Asansol",
      state: "West Bengal",
      zip: "713304",
      country: "India",
      coordinates: {
        lat: 23.6739,
        lng: 86.9524
      }
    },
    contactInfo: {
      email: "noel.regis04@gmail.com",
      phone: "+91 7319546900",
      website: "noelregis.dev"
    },
    tags: ["JavaScript", "React", "Node.js"],
    createdAt: "2023-02-18T11:40:00Z",
    updatedAt: "2023-07-25T09:15:00Z",
    interests: ["Open Source", "Music", "Football"]
  }
];
