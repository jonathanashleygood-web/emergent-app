import requests
import sys
import json
from datetime import datetime

class TravelInquiryAPITester:
    def __init__(self, base_url="https://trip-planner-180.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_inquiry_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PATCH':
                response = requests.patch(url, headers=headers, params=params)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if method == 'POST' and 'id' in response_data:
                        print(f"   Created ID: {response_data['id']}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_create_inquiry(self):
        """Test creating a travel inquiry"""
        test_data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "+44 7700 900123",
            "preferred_contact_method": "email",
            "destinations": "Italy, France",
            "destination_flexibility": "open",
            "departure_airport": "LHR",
            "departure_flexible": False,
            "travel_start_date": "2024-06-15",
            "travel_end_date": "2024-06-25",
            "trip_length_nights": 10,
            "adult_count": 2,
            "child_count": 0,
            "budget_min": 3000.0,
            "budget_max": 5000.0,
            "budget_flexibility": "flexible",
            "budget_scope": "total_trip",
            "travel_pace": "balanced",
            "travel_interests": ["culture", "food_wine"],
            "accommodation_type": ["boutique_hotel"],
            "accommodation_priority": "comfort",
            "flight_priority": "balanced",
            "layover_tolerance": "flexible",
            "transport_preference": ["transfers"],
            "must_do_experiences": "Wine tasting in Tuscany",
            "exploration_style": "mixed",
            "special_occasion": "Anniversary",
            "passport_valid": "yes",
            "booking_timeline": "1_3_months",
            "planning_style": "collaborative"
        }
        
        success, response = self.run_test("Create Inquiry", "POST", "inquiries", 201, data=test_data)
        if success and 'id' in response:
            self.created_inquiry_id = response['id']
        return success

    def test_get_inquiries(self):
        """Test getting all inquiries"""
        return self.run_test("Get All Inquiries", "GET", "inquiries", 200)

    def test_get_inquiry_stats(self):
        """Test getting inquiry statistics"""
        success, response = self.run_test("Get Inquiry Stats", "GET", "inquiries/stats", 200)
        if success:
            required_fields = ['total', 'new', 'contacted', 'in_progress', 'booked']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field in stats: {field}")
                    return False
            print(f"   Stats: {response}")
        return success

    def test_get_inquiry_by_id(self):
        """Test getting a specific inquiry by ID"""
        if not self.created_inquiry_id:
            print("❌ No inquiry ID available for testing")
            return False
        
        return self.run_test("Get Inquiry by ID", "GET", f"inquiries/{self.created_inquiry_id}", 200)

    def test_update_inquiry_status(self):
        """Test updating inquiry status"""
        if not self.created_inquiry_id:
            print("❌ No inquiry ID available for testing")
            return False
        
        return self.run_test("Update Inquiry Status", "PATCH", f"inquiries/{self.created_inquiry_id}/status", 200, params={"status": "contacted"})

    def test_search_inquiries(self):
        """Test searching inquiries"""
        return self.run_test("Search Inquiries", "GET", "inquiries", 200, params={"search": "John"})

    def test_filter_inquiries_by_status(self):
        """Test filtering inquiries by status"""
        return self.run_test("Filter by Status", "GET", "inquiries", 200, params={"status": "new"})

    def test_delete_inquiry(self):
        """Test deleting an inquiry"""
        if not self.created_inquiry_id:
            print("❌ No inquiry ID available for testing")
            return False
        
        return self.run_test("Delete Inquiry", "DELETE", f"inquiries/{self.created_inquiry_id}", 200)

    def test_invalid_endpoints(self):
        """Test invalid endpoints return proper errors"""
        success1, _ = self.run_test("Get Non-existent Inquiry", "GET", "inquiries/invalid-id", 404)
        success2, _ = self.run_test("Update Non-existent Inquiry", "PATCH", "inquiries/invalid-id/status", 404, params={"status": "contacted"})
        return success1 and success2

def main():
    print("🚀 Starting Travel Inquiry API Tests")
    print("=" * 50)
    
    tester = TravelInquiryAPITester()
    
    # Test sequence
    tests = [
        ("API Root", tester.test_api_root),
        ("Create Inquiry", tester.test_create_inquiry),
        ("Get All Inquiries", tester.test_get_inquiries),
        ("Get Inquiry Stats", tester.test_get_inquiry_stats),
        ("Get Inquiry by ID", tester.test_get_inquiry_by_id),
        ("Update Inquiry Status", tester.test_update_inquiry_status),
        ("Search Inquiries", tester.test_search_inquiries),
        ("Filter by Status", tester.test_filter_inquiries_by_status),
        ("Invalid Endpoints", tester.test_invalid_endpoints),
        ("Delete Inquiry", tester.test_delete_inquiry),
    ]
    
    for test_name, test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())