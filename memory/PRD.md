# Little Luxe GETAWAYS by Carly - PRD

## Original Problem Statement
Build a multi-step travel client interest form for a small travel business with:
- 7-step wizard form collecting: Trip details, Group & Budget, Travel Style, Flights & Transport, Experiences, Practical Details, Contact Info
- Admin dashboard to view/filter/analyze all submitted inquiries
- Design style: Warm & inviting with travel imagery and earthy tones

## User Personas
1. **Travel Clients**: People seeking personalized luxury travel planning, looking for a simple and beautiful way to share their travel preferences
2. **Business Owner (Carly)**: Needs to view, manage, and track travel inquiries efficiently

## Core Requirements (Static)
- Multi-step form wizard with 7 screens
- Data model: TravelInquiry entity with all specified fields
- Admin dashboard with inquiry list, filtering, search, and detail view
- Status management for inquiries (new, contacted, in_progress, booked, archived)
- Warm, inviting UI with Playfair Display + Manrope typography
- Terracotta, Sage, Sand color palette

## What's Been Implemented (December 2024)
### Backend
- FastAPI server with MongoDB integration
- TravelInquiry model with all fields from spec
- CRUD endpoints: POST /api/inquiries, GET /api/inquiries, GET /api/inquiries/:id, PATCH /api/inquiries/:id/status, DELETE /api/inquiries/:id
- Statistics endpoint: GET /api/inquiries/stats
- Search and filter by status support

### Frontend
- Landing page with hero section and "Start Planning" CTA
- 7-step form wizard with animated transitions:
  - Step 1: Trip Details (destinations, dates, airports)
  - Step 2: Group & Budget
  - Step 3: Travel Style (pace, interests, accommodation)
  - Step 4: Flights & Transport
  - Step 5: Experiences
  - Step 6: Practical Details
  - Step 7: Contact Info & Submit
- Thank You page after submission
- Admin Dashboard with:
  - Stats cards (total, new, contacted, in_progress, booked)
  - Search and status filter
  - Inquiry list with key details
  - Delete functionality
- Inquiry Detail page with:
  - All information organized in sections
  - Status update dropdown
  - Delete option

### Design
- Custom Logo: "Little Luxe GETAWAYS by Carly" with plane icon
- Split-screen wizard layout with travel imagery
- Warm earthy color palette (terracotta, sage, sand)
- Playfair Display + Manrope + Caveat fonts
- Framer Motion animations

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] Multi-step form wizard
- [x] Form submission to backend
- [x] Admin dashboard
- [x] Inquiry detail view
- [x] Status management

### P1 (High Priority) - Future
- [ ] Admin authentication/login
- [ ] Email notifications on new inquiry
- [ ] PDF export of inquiry details
- [ ] Notes/comments on inquiries

### P2 (Medium Priority) - Future
- [ ] Inquiry assignment to team members
- [ ] Dashboard analytics (charts)
- [ ] Bulk status update
- [ ] Client communication log

## Next Tasks
1. Add admin authentication (simple password protection or full auth)
2. Email integration for notifications
3. PDF export feature for sharing with suppliers
