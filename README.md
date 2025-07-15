# eBandobast Backend API

**eBandobast** is a comprehensive police management system for organizing and coordinating police operations, assignments, patrols, meetings, and alert management. The backend provides RESTful APIs to manage all aspects of police bandobast (security arrangements) operations.

## 🏗️ System Architecture

![eBandobast System Architecture](/public/sysarch.png)

## 📊 Database Schema

![eBandobast Database Schema](/public/erdiagram.png)

### Entity Relationship Overview

The eBandobast database consists of the following main entities:

#### **Core Entities:**
- **PoliceStation**: Central hub for all police operations
- **Admin**: Administrative officers who manage operations
- **DutyOfficer**: Field officers who execute assignments
- **Bandobast**: Security arrangement events

#### **Operational Entities:**
- **BandobastAssignment**: Specific duty assignments for bandobast events
- **Patrolling**: Patrol operations and schedules
- **Meeting**: Inter-departmental meetings and briefings
- **alertInfo**: Real-time alerts and incident reports
- **coordinates**: GPS tracking for teams and areas
- **joinBandobast**: Many-to-many relationship for officer-bandobast assignments

#### **Key Relationships:**
- Police stations have multiple admins and duty officers
- Bandobast events can have multiple assignments, alerts, and coordinates
- Admins can create and receive meetings
- Duty officers can join multiple bandobast operations
- Patrols can generate multiple alert reports

#### **Database Features:**
- **Primary Keys**: UUID-based unique identifiers for all entities
- **Foreign Keys**: Proper referential integrity between related entities
- **Unique Constraints**: Phone numbers and batch IDs are unique
- **Timestamps**: Automatic creation and update tracking
- **Array Fields**: Support for multiple routes, officers, and image URLs

## 🚀 Features

- **Authentication System**: Separate login for Admins and Duty Officers
- **Bandobast Management**: Create, manage, and assign bandobast operations
- **Patrol Management**: Schedule and track patrol activities
- **Meeting Scheduling**: Organize meetings between officials
- **Alert System**: Real-time alert management with image uploads
- **Coordinate Tracking**: GPS coordinate management for teams
- **Assignment Management**: Detailed duty assignments with time tracking

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary
- **Password Hashing**: bcrypt
- **Validation**: validator.js

## 📁 Project Structure

```
ebandobast_backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── app.js                 # Main application entry point
│   ├── controllers/           # Business logic controllers
│   │   ├── auth.js           # Authentication logic
│   │   ├── bandobast.js      # Bandobast operations
│   │   ├── patrolling.js     # Patrol management
│   │   ├── meetingController.js  # Meeting management
│   │   ├── alertInfo.js      # Alert handling
│   │   ├── bandobastAssignment.js # Assignment management
│   │   └── coordinates.js    # GPS coordinate handling
│   └── routes/               # API route definitions
│       ├── authRoute.js      # Authentication routes
│       ├── bandobastRoute.js # Bandobast routes
│       ├── patrolRoutes.js   # Patrol routes
│       ├── meetingRoutes.js  # Meeting routes
│       ├── alertInfoRoute.js # Alert routes
│       ├── bandoAssRoute.js  # Assignment routes
│       └── coordinatesRoute.js # Coordinate routes
├── package.json              # Dependencies and scripts
└── README.md                # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd ebandobast_backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ebandobast_db"
JWT_SECRET="your-secret-key-here"
PORT=8000
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

4. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed database with sample data
npx prisma db seed
```

5. **Start the server**
```bash
# Development mode
npm start

# Production mode
npm run start:prod
```

The server will start at `http://localhost:8000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/admin` | Admin login | `{phone, batchId, rank}` |
| GET | `/admin` | Get all admins | - |
| GET | `/admin/:id` | Get single admin | - |
| POST | `/dutyofficer` | Duty officer login | `{phone, batchId, rank}` |
| GET | `/dutyofficer` | Get all duty officers | - |
| GET | `/dutyofficer/:id` | Get single duty officer | - |

### Bandobast Routes (`/api/bandobast`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/` | Create bandobast | `{name, date, location, description}` |
| GET | `/` | Get all bandobasts | - |
| GET | `/:id` | Get bandobast by ID | - |
| POST | `/join` | Join bandobast | `{bandobastId, dutyOfficerId}` |

### Patrol Routes (`/api/patrols`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/` | Create patrol | `{name, route, vehicleNumber, numofOfficers, patrolOfficers, supervisor, date, startTime, endTime, description}` |
| GET | `/` | Get all patrols | - |
| GET | `/:id` | Get patrol by ID | - |
| PUT | `/:id` | Update patrol | Patrol data |
| DELETE | `/:id` | Delete patrol | - |

### Meeting Routes (`/api/meetings`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/` | Create meeting | `{creatorId, receiverId, name, date, time, location, agenda}` |
| GET | `/` | Get all meetings | - |
| GET | `/:id` | Get meeting by ID | - |
| PUT | `/:id` | Update meeting | Meeting data |
| DELETE | `/:id` | Delete meeting | - |

### Alert Info Routes (`/api/alertinfo`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/` | Create alert | `{description, imgURL, location, bandobastId, patrolId}` |
| GET | `/` | Get all alerts | - |

### Assignment Routes (`/api/bandoass`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/` | Create assignment | `{teamName, officerName, mobileNumber, supervisionOfficer, charterOfDuty, startTime, endTime, date, callSign, bandobastId}` |
| GET | `/` | Get all assignments | - |
| GET | `/:id` | Get assignment by ID | - |
| PUT | `/:id` | Update assignment | Assignment data |
| DELETE | `/:id` | Delete assignment | - |

### Coordinates Routes (`/api/coordinates`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/` | Create coordinates | `{teamName, latitude1, longitude1, latitude2, longitude2, latitude3, longitude3, latitude4, longitude4, bandobastId}` |
| GET | `/` | Get all coordinates | - |
| GET | `/:id` | Get coordinates by ID | - |
| PUT | `/:id` | Update coordinates | Coordinate data |
| DELETE | `/:id` | Delete coordinates | - |

## 📝 Sample API Usage

### 1. Admin Login
```bash
curl -X POST http://localhost:8000/api/auth/admin \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "batchId": "ADM001",
    "rank": "Inspector"
  }'
```

### 2. Create Bandobast
```bash
curl -X POST http://localhost:8000/api/bandobast \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Republic Day Security",
    "date": "2025-01-26T06:00:00Z",
    "location": "Red Fort, Delhi",
    "description": "High-security bandobast for Republic Day celebrations"
  }'
```

### 3. Create Patrol
```bash
curl -X POST http://localhost:8000/api/patrols \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Morning Patrol Alpha",
    "route": ["Sector 1", "Sector 2", "Sector 3"],
    "vehicleNumber": "DL01AB1234",
    "numofOfficers": 4,
    "patrolOfficers": ["Officer A", "Officer B", "Officer C", "Officer D"],
    "supervisor": "Inspector Smith",
    "date": "2025-01-26T00:00:00Z",
    "startTime": "2025-01-26T06:00:00Z",
    "endTime": "2025-01-26T14:00:00Z",
    "description": "Regular morning patrol covering high-risk areas"
  }'
```

## 🎯 Sample Data

### Police Stations
```json
[
  {
    "id": "ps-001",
    "name": "Central Police Station",
    "location": "Downtown, Delhi"
  },
  {
    "id": "ps-002", 
    "name": "North District Police Station",
    "location": "North Delhi"
  }
]
```

### Admins
```json
[
  {
    "id": "admin-001",
    "name": "Rajesh Kumar",
    "phone": "+919876543210",
    "batchId": "ADM001",
    "rank": "Inspector",
    "policeStationId": "ps-001"
  },
  {
    "id": "admin-002",
    "name": "Priya Sharma", 
    "phone": "+919876543211",
    "batchId": "ADM002",
    "rank": "Sub-Inspector",
    "policeStationId": "ps-002"
  }
]
```

### Duty Officers
```json
[
  {
    "id": "do-001",
    "name": "Amit Singh",
    "phone": "+919876543212",
    "batchId": "DO001",
    "rank": "Constable",
    "policeStationId": "ps-001"
  },
  {
    "id": "do-002",
    "name": "Sunita Devi",
    "phone": "+919876543213", 
    "batchId": "DO002",
    "rank": "Head Constable",
    "policeStationId": "ps-001"
  }
]
```

### Bandobast Events
```json
[
  {
    "id": "bd-001",
    "name": "Republic Day Security",
    "date": "2025-01-26T06:00:00Z",
    "location": "Red Fort, Delhi",
    "description": "High-security arrangements for Republic Day parade and celebrations"
  },
  {
    "id": "bd-002",
    "name": "Cricket Match Security",
    "date": "2025-02-15T14:00:00Z", 
    "location": "Feroz Shah Kotla Ground",
    "description": "Security arrangements for India vs Australia cricket match"
  }
]
```

### Bandobast Assignments
```json
[
  {
    "id": "ba-001",
    "teamName": "Alpha Team",
    "officerName": "Constable Ravi Kumar",
    "mobileNumber": "+919876543214",
    "supervisionOfficer": "Inspector Rajesh Kumar",
    "charterOfDuty": "Main Gate Security",
    "startTime": "2025-01-26T05:00:00Z",
    "endTime": "2025-01-26T13:00:00Z",
    "date": "2025-01-26T00:00:00Z",
    "callSign": "ALPHA-01",
    "bandobastId": "bd-001"
  },
  {
    "id": "ba-002",
    "teamName": "Bravo Team", 
    "officerName": "Head Constable Sunita Devi",
    "mobileNumber": "+919876543215",
    "supervisionOfficer": "Sub-Inspector Priya Sharma",
    "charterOfDuty": "Perimeter Patrol",
    "startTime": "2025-01-26T06:00:00Z",
    "endTime": "2025-01-26T14:00:00Z",
    "date": "2025-01-26T00:00:00Z",
    "callSign": "BRAVO-01",
    "bandobastId": "bd-001"
  }
]
```

### Patrols
```json
[
  {
    "id": "patrol-001",
    "name": "Morning Patrol Alpha",
    "route": ["Sector 1", "Sector 2", "Main Road", "Market Area"],
    "vehicleNumber": "DL01AB1234",
    "numofOfficers": 4,
    "patrolOfficers": ["Constable A", "Constable B", "Head Constable C", "Constable D"],
    "supervisor": "Inspector Rajesh Kumar",
    "date": "2025-01-26T00:00:00Z",
    "startTime": "2025-01-26T06:00:00Z",
    "endTime": "2025-01-26T14:00:00Z",
    "description": "Regular morning patrol covering high-risk areas during Republic Day"
  }
]
```

### Alert Information
```json
[
  {
    "id": "alert-001",
    "description": "Suspicious package found near main gate",
    "imgURL": ["https://cloudinary.com/image1.jpg", "https://cloudinary.com/image2.jpg"],
    "location": "Main Gate, Red Fort",
    "bandobastId": "bd-001",
    "patrolId": "patrol-001"
  },
  {
    "id": "alert-002",
    "description": "Crowd gathering beyond capacity in Section C",
    "imgURL": ["https://cloudinary.com/crowd-image.jpg"],
    "location": "Section C, Red Fort",
    "bandobastId": "bd-001", 
    "patrolId": "patrol-001"
  }
]
```

### Coordinates
```json
[
  {
    "id": "coord-001",
    "teamName": "Alpha Team",
    "latitude1": 28.6562,
    "longitude1": 77.2410,
    "latitude2": 28.6572,
    "longitude2": 77.2420,
    "latitude3": 28.6582,
    "longitude3": 77.2430,
    "latitude4": 28.6552,
    "longitude4": 77.2400,
    "bandobastId": "bd-001"
  }
]
```

### Meetings
```json
[
  {
    "id": "meeting-001",
    "creatorId": "admin-001",
    "receiverId": "admin-002",
    "name": "Republic Day Security Briefing",
    "date": "2025-01-25T00:00:00Z",
    "time": "2025-01-25T10:00:00Z",
    "location": "Conference Room, Central Police Station",
    "agenda": "Discuss security arrangements, team assignments, and emergency protocols for Republic Day celebrations"
  }
]
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Tokens expire after 24 hours and need to be refreshed.

## 🐛 Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```

## 🧪 Testing

### Manual Testing with cURL

Test the authentication endpoint:
```bash
curl -X POST http://localhost:8000/api/auth/admin \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210", "batchId": "ADM001", "rank": "Inspector"}'
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables for base URL and tokens
3. Test each endpoint with sample data

## 📊 Performance Considerations

- Database queries are optimized using Prisma ORM
- Indexes are created on frequently queried fields
- JWT tokens reduce database lookups for authentication
- Image uploads are handled via Cloudinary CDN

## 🔮 Future Enhancements

- Real-time notifications using WebSockets
- Mobile app integration
- Advanced analytics and reporting
- Integration with mapping services
- Automated patrol scheduling
- Advanced search and filtering capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Team

- **Backend Development**: Node.js, Express.js, Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **File Storage**: Cloudinary

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**eBandobast Backend API** - Streamlining police operations with modern technology.
