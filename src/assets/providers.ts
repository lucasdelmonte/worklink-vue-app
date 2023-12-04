export const providers = {
  "providers": [
    {
      "id": 1,
      "full_name": "Provider 1",
      "role": "Provider",
      "phone_number": "123456789",
      "email": "provider1@example.com",
      "rating": 3.8,
      "isActive": true,
      "businesses": [
        {
          "id": 101,
          "category": "Restaurant",
          "name": "Provider 1's Restaurant",
          "description": "We offer delicious food",
          "images": ["image1.jpg", "image2.jpg"],
          "isActive": true,
          "rating": 4.7,
          "reviews": [
            {
              "id": 1001,
              "date": "2023-11-28",
              "user": "User1",
              "description": "Good food, good service",
              "rating": 4.5
            },
            {
              "id": 1002,
              "date": "2023-11-29",
              "user": "User2",
              "description": "Pleasant atmosphere",
              "rating": 5.0
            }
          ]
        },
        {
          "id": 102,
          "category": "Beauty",
          "name": "Provider 1's Beauty Salon",
          "description": "Indulge in a world of elegance and pampering at our beauty sanctuary. Our skilled professionals are dedicated to enhancing your natural beauty with a range of exquisite services. From rejuvenating facials to precision hairstyling, each experience is crafted to provide a moment of bliss and self-discovery. Step into a realm of relaxation, where every treatment is a celebration of your unique allure. Elevate your beauty routine with our tailored services, designed to bring out the best in you. Discover the art of self-care and let our beauty experts redefine your radiance. Your journey to timeless beauty begins here.",
          "images": ["image3.jpg", "image4.jpg"],
          "isActive": false,
          "rating": 3.0,
          "reviews": [
            {
              "id": 1003,
              "date": "2023-11-30",
              "user": "User3",
              "description": "Good beauty services",
              "rating": 3.0
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "full_name": "Provider 2",
      "role": "Provider",
      "phone_number": "987654321",
      "email": "provider2@example.com",
      "rating": 4.8,
      "isActive": true,
      "businesses": [
        {
          "id": 201,
          "category": "Setter",
          "name": "Provider 2's Setter Service",
          "description": "Quality setting services",
          "images": ["image5.jpg", "image6.jpg"],
          "isActive": true,
          "rating": 4.8,
          "reviews": [
            {
              "id": 1004,
              "date": "2023-12-01",
              "user": "User4",
              "description": "Great setting services",
              "rating": 4.5
            },
            {
              "id": 1005,
              "date": "2023-12-02",
              "user": "User5",
              "description": "Excellent customer service",
              "rating": 5.0
            }
          ]
        },
        {
          "id": 202,
          "category": "Gardener",
          "name": "Provider 2's Gardening Service",
          "description": "Transforming your garden",
          "images": ["image7.jpg", "image8.jpg"],
          "isActive": true,
          "rating": 4.0,
          "reviews": [
            {
              "id": 1006,
              "date": "2023-12-03",
              "user": "User6",
              "description": "Beautiful garden transformations",
              "rating": 4.0
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "full_name": "Provider 3",
      "role": "Provider",
      "phone_number": "555555555",
      "email": "provider3@example.com",
      "rating": 4.2,
      "isActive": true,
      "businesses": [
        {
          "id": 301,
          "category": "Painter",
          "name": "Provider 3's Painting Service",
          "description": "Bringing colors to your life",
          "images": ["image9.jpg", "image10.jpg"],
          "isActive": true,
          "rating": 4.2,
          "reviews": [
            {
              "id": 1007,
              "date": "2023-12-04",
              "user": "User7",
              "description": "Skillful and professional painting",
              "rating": 4.2
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "full_name": "Provider 4",
      "role": "Provider",
      "phone_number": "111111111",
      "email": "provider4@example.com",
      "rating": 4.2,
      "isActive": true,
      "businesses": [
        {
          "id": 401,
          "category": "Upholsterer",
          "name": "Provider 4's Upholstery Service",
          "description": "Quality upholstery services",
          "images": ["image11.jpg", "image12.jpg"],
          "isActive": true,
          "rating": 4.2,
          "reviews": [
            {
              "id": 1008,
              "date": "2023-12-05",
              "user": "User8",
              "description": "Comfortable and stylish upholstery",
              "rating": 4.5
            },
            {
              "id": 1009,
              "date": "2023-12-06",
              "user": "User9",
              "description": "Prompt and efficient service",
              "rating": 4.0
            }
          ]
        },
        {
          "id": 402,
          "category": "Pest control",
          "name": "Provider 4's Pest Control",
          "description": "Effective pest control solutions",
          "images": ["image13.jpg", "image14.jpg"],
          "isActive": true,
          "rating": 4.8,
          "reviews": [
            {
              "id": 1010,
              "date": "2023-12-07",
              "user": "User10",
              "description": "No more pests!",
              "rating": 5.0
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "full_name": "Provider 5",
      "role": "Provider",
      "phone_number": "222222222",
      "email": "provider5@example.com",
      "rating": 3.7,
      "isActive": true,
      "businesses": [
        {
          "id": 501,
          "category": "Events",
          "name": "Provider 5's Event Planning",
          "description": "Creating memorable events",
          "images": ["image15.jpg", "image16.jpg"],
          "isActive": true,
          "rating": 3.5,
          "reviews": [
            {
              "id": 1011,
              "date": "2023-12-08",
              "user": "User11",
              "description": "Well-organized and enjoyable events",
              "rating": 3.8
            }
          ]
        },
        {
          "id": 502,
          "category": "Blacksmith",
          "name": "Provider 5's Blacksmith Services",
          "description": "Crafting quality metalwork",
          "images": ["image17.jpg", "image18.jpg"],
          "isActive": false,
          "rating": 3.0,
          "reviews": [
            {
              "id": 1012,
              "date": "2023-12-09",
              "user": "User12",
              "description": "Unique and artistic metalwork",
              "rating": 3.0
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "full_name": "Provider 6",
      "role": "Provider",
      "phone_number": "222222222",
      "email": "provider5@example.com",
      "rating": 3.7,
      "isActive": true,
      "businesses": [
        {
          "id": 601,
          "category": "Events",
          "name": "Provider 6's Event Planning",
          "description": "Creating memorable events",
          "images": ["image16.jpg", "image178.jpg"],
          "isActive": true,
          "rating": 3.5,
          "reviews": [
            {
              "id": 1011,
              "date": "2023-12-08",
              "user": "User11",
              "description": "Well-organized and enjoyable events",
              "rating": 3.8,
            },
          ],
        },
        {
          "id": 602,
          "category": "Blacksmith",
          "name": "Provider 5's Blacksmith Services",
          "description": "Crafting quality metalwork",
          "images": ["image17.jpg", "image18.jpg"],
          "isActive": false,
          "rating": 3.0,
          "reviews": [
            {
              "id": 1012,
              "date": "2023-12-09",
              "user": "User12",
              "description": "Unique and artistic metalwork",
              "rating": 3.0,
            },
          ],
        },
      ],
    },
    {
      "id": 6,
      "full_name": "Provider 6",
      "role": "Provider",
      "phone_number": "333333333",
      "email": "provider6@example.com",
      "rating": 4.2,
      "isActive": true,
      "businesses": [
        {
          "id": 601,
          "category": "Beauty",
          "name": "Provider 6's Beauty Studio",
          "description": "Elevate your beauty with our premium services",
          "images": ["image19.jpg", "image20.jpg"],
          "isActive": true,
          "rating": 4.5,
          "reviews": [
            {
              "id": 1013,
              "date": "2023-12-10",
              "user": "User13",
              "description": "Exceptional beauty services",
              "rating": 4.8,
            },
          ],
        },
      ],
    },
    {
      "id": 7,
      "full_name": "Provider 7",
      "role": "Provider",
      "phone_number": "444444444",
      "email": "provider7@example.com",
      "rating": 3.9,
      "isActive": true,
      "businesses": [
        {
          "id": 701,
          "category": "Beauty",
          "name": "Provider 7's Beauty Lounge",
          "description": "Experience luxury and sophistication",
          "images": ["image21.jpg", "image22.jpg"],
          "isActive": true,
          "rating": 4.2,
          "reviews": [
            {
              "id": 1014,
              "date": "2023-12-11",
              "user": "User14",
              "description": "A relaxing and rejuvenating escape",
              "rating": 4.0,
            },
          ],
        },
      ],
    },
    {
      "id": 8,
      "full_name": "Provider 8",
      "role": "Provider",
      "phone_number": "555555555",
      "email": "provider8@example.com",
      "rating": 4.0,
      "isActive": true,
      "businesses": [
        {
          "id": 801,
          "category": "Events",
          "name": "Provider 8's Event Management",
          "description": "Creating memorable and seamless events",
          "images": ["image23.jpg", "image24.jpg"],
          "isActive": true,
          "rating": 4.3,
          "reviews": [
            {
              "id": 1015,
              "date": "2023-12-12",
              "user": "User15",
              "description": "Well-coordinated and enjoyable events",
              "rating": 4.5,
            },
          ],
        },
      ],
    },
    {
      "id": 9,
      "full_name": "Provider 9",
      "role": "Provider",
      "phone_number": "666666666",
      "email": "provider9@example.com",
      "rating": 3.5,
      "isActive": true,
      "businesses": [
        {
          "id": 901,
          "category": "Construction",
          "name": "Provider 9's Construction Services",
          "description": "Building dreams into reality",
          "images": ["image25.jpg", "image26.jpg"],
          "isActive": false,
          "rating": 3.0,
          "reviews": [
            {
              "id": 1016,
              "date": "2023-12-13",
              "user": "User16",
              "description": "Quality construction work",
              "rating": 3.5,
            },
          ],
        },
      ],
    }
  ]
}