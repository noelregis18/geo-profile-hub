
import { Profile } from "../types";

export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Jane Cooper",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "UX Designer & Researcher with 5+ years of experience creating user-centric digital products",
    address: {
      street: "123 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    contactInfo: {
      email: "jane.cooper@example.com",
      phone: "+1 (415) 555-1234",
      website: "janecooper.design"
    },
    tags: ["Design", "Research", "Product"],
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-06-20T16:30:00Z",
    interests: ["Photography", "Hiking", "Typography"]
  },
  {
    id: "2",
    name: "Michael Johnson",
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Software Engineer specializing in full-stack development with React and Node.js",
    address: {
      street: "456 5th Ave",
      city: "New York",
      state: "NY",
      zip: "10018",
      country: "USA",
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    contactInfo: {
      email: "michael.johnson@example.com",
      phone: "+1 (212) 555-5678"
    },
    tags: ["Engineering", "JavaScript", "React"],
    createdAt: "2023-02-10T10:15:00Z",
    updatedAt: "2023-05-18T14:45:00Z",
    interests: ["Gaming", "Machine Learning", "Coffee"]
  },
  {
    id: "3",
    name: "Sarah Williams",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Marketing Specialist with expertise in digital campaigns and data-driven strategies",
    address: {
      street: "789 Peachtree St",
      city: "Atlanta",
      state: "GA",
      zip: "30308",
      country: "USA",
      coordinates: {
        lat: 33.7490,
        lng: -84.3880
      }
    },
    contactInfo: {
      email: "sarah.williams@example.com",
      phone: "+1 (404) 555-9012",
      website: "sarahwilliams.marketing"
    },
    tags: ["Marketing", "Analytics", "Strategy"],
    createdAt: "2023-03-05T09:30:00Z",
    updatedAt: "2023-07-12T11:20:00Z",
    interests: ["Yoga", "Travel", "Cooking"]
  },
  {
    id: "4",
    name: "David Chen",
    imageUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Data Scientist focusing on predictive analytics and machine learning algorithms",
    address: {
      street: "101 Main St",
      city: "Boston",
      state: "MA",
      zip: "02110",
      country: "USA",
      coordinates: {
        lat: 42.3601,
        lng: -71.0589
      }
    },
    contactInfo: {
      email: "david.chen@example.com",
      phone: "+1 (617) 555-3456"
    },
    tags: ["Data Science", "Python", "ML"],
    createdAt: "2023-01-25T15:45:00Z",
    updatedAt: "2023-06-30T13:10:00Z",
    interests: ["Chess", "Reading", "Music"]
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Project Manager with 8+ years leading cross-functional teams in tech and finance sectors",
    address: {
      street: "555 Congress Ave",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "USA",
      coordinates: {
        lat: 30.2672,
        lng: -97.7431
      }
    },
    contactInfo: {
      email: "emily.rodriguez@example.com",
      phone: "+1 (512) 555-7890",
      website: "emilyrodriguez.pm"
    },
    tags: ["Project Management", "Agile", "Leadership"],
    createdAt: "2023-04-12T08:20:00Z",
    updatedAt: "2023-08-05T16:50:00Z",
    interests: ["Running", "Dogs", "Interior Design"]
  },
  {
    id: "6",
    name: "Robert Kim",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    description: "Product Manager focused on building scalable B2B SaaS solutions",
    address: {
      street: "222 Pine St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA",
      coordinates: {
        lat: 47.6062,
        lng: -122.3321
      }
    },
    contactInfo: {
      email: "robert.kim@example.com",
      phone: "+1 (206) 555-2345"
    },
    tags: ["Product", "SaaS", "Strategy"],
    createdAt: "2023-02-18T11:40:00Z",
    updatedAt: "2023-07-25T09:15:00Z",
    interests: ["Rock Climbing", "Photography", "Cooking"]
  }
];
