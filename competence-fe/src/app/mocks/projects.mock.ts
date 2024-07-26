import { ProjectModel } from '../features/employee/models/project.model';
import { Technology } from '../core/constants/technology.enum';

export const PROJECTS: ProjectModel[] = [
  {
    title: 'Jungle',
    description: 'Tropical fruits delivery system',
    technologies: [Technology.ANGULAR, Technology.JAVA, Technology.SPRING_BOOT],
  },
  {
    title: 'EVO',
    description: 'Software for accountants',
    technologies: [
      Technology.REACT,
      Technology.PHP,
      Technology.LARAVEL,
      Technology.SUPABASE,
    ],
  },
  {
    title: 'CloudSync',
    description: 'File synchronization service for cloud storage',
    technologies: [Technology.NODE_JS, Technology.DOCKER, Technology.AZURE],
  },
  {
    title: 'HealthHub',
    description: 'Telemedicine platform for remote healthcare',
    technologies: [
      Technology.REACT_NATIVE,
      Technology.DJANGO,
      Technology.MONGODB,
    ],
  },
  {
    title: 'EduTrack',
    description: 'Student performance tracking system for schools',
    technologies: [Technology.VUE_JS, Technology.PYTHON],
  },
  {
    title: 'StockAnalyzer',
    description: 'Real-time stock market analysis tool',
    technologies: [Technology.SPRING_BOOT, Technology.KAFKA, Technology.REACT],
  },
  {
    title: 'FitLife',
    description: 'Fitness app with personalized workout plans',
    technologies: [Technology.ANGULAR, Technology.NODE_JS, Technology.MYSQL],
  },
  {
    title: 'ShopMate',
    description: 'E-commerce platform for small businesses',
    technologies: [
      Technology.SVELTE,
      Technology.RUBY_ON_RAILS,
      Technology.REDIS,
    ],
  },
  {
    title: 'TravelBuddy',
    description: 'Travel planning and booking application',
    technologies: [Technology.FIREBASE, Technology.GRAPHQL],
  },
  {
    title: 'GreenThumb',
    description: 'Urban gardening community platform',
    technologies: [Technology.VUE_JS, Technology.DJANGO, Technology.MONGODB],
  },
  {
    title: 'EventHive',
    description: 'Event management and ticketing system',
    technologies: [
      Technology.REACT,
      Technology.NODE_JS,
      Technology.ELASTICSEARCH,
    ],
  },
  {
    title: 'CodeCollab',
    description: 'Collaborative coding environment for developers',
    technologies: [
      Technology.ANGULAR,
      Technology.SPRING_BOOT,
      Technology.MONGODB,
    ],
  },
  {
    title: 'PetCare',
    description: 'Pet health and wellness management app',
    technologies: [
      Technology.REACT_NATIVE,
      Technology.FIREBASE,
      Technology.REDIS,
    ],
  },
  {
    title: 'HomeCook',
    description: 'Recipe sharing and meal planning app',
    technologies: [Technology.VUE_JS, Technology.PHP, Technology.MYSQL],
  },
  {
    title: 'SafeDrive',
    description: 'Vehicle telematics and safety monitoring system',
    technologies: [
      Technology.SPRING_BOOT,
      Technology.KAFKA,
      Technology.PROMETHEUS,
    ],
  },
  {
    title: 'BookClub',
    description: 'Online community for book enthusiasts',
    technologies: [Technology.NUXT_JS, Technology.PHP, Technology.LARAVEL],
  },
  {
    title: 'MindSpace',
    description: 'Meditation and mental health app',
    technologies: [Technology.DJANGO, Technology.SQLITE],
  },
  {
    title: 'FarmFresh',
    description: 'Farm-to-table marketplace',
    technologies: [Technology.REACT, Technology.NODE_JS],
  },
  {
    title: 'DevDash',
    description: 'Developer productivity and analytics dashboard',
    technologies: [Technology.NEXT_JS, Technology.GO, Technology.GRAFANA],
  },
  {
    title: 'ArtShare',
    description: 'Platform for artists to share and sell their work',
    technologies: [
      Technology.ANGULAR,
      Technology.RUBY_ON_RAILS,
      Technology.MONGODB,
    ],
  },
];
