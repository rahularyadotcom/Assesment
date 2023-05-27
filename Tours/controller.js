const Tour = require('./model');
const Place = require('../Places/model');
module.exports = {
    addTour: (req, res) => {
        const newTourData = {
            slug: "amazing-thailand-tour",
            places: [placeId1, placeId2], // Array of referenced place IDs
            price: 500,
            images: ["https://example.com/tour-image1.jpg", "https://example.com/tour-image2.jpg"],
            languages: ["English", "Vietnamese"],
            coverImage: "https://example.com/tour-cover.jpg",
            duration: "72 hours",
            sku: "TH-001",
            name: "Amazing Thailand Tour",
            content: "Embark on a journey through the captivating landscapes of Thailand.",
            description: "Experience the best of Thailand's culture, history, and natural beauty.",
            metadata: {
                title: "Discover the Wonders of Thailand",
                description: "Unforgettable tour exploring Thailand's hidden gems."
            },
            itinerary: [
                {
                    title: "Day 1",
                    content: "Arrival in Bangkok, visit Grand Palace and Wat Phra Kaew."
                },
                {
                    title: "Day 2",
                    content: "Explore Ayutthaya, the ancient capital of Thailand."
                },
                {
                    title: "Day 3",
                    content: "Relax on the beautiful beaches of Phuket."
                }
            ]
        };

        Tour.create(newTourData)
            .then(tour => {
                console.log("New tour created:", tour);
            })
            .catch(error => {
                console.error("Error creating tour:", error);
            });
    },
    getTour: (req, res) => {
        // Find a tour by slug
        Tour.findOne({ slug: "amazing-thailand-tour" })
            .then(tour => {
                if (tour) {
                    console.log("Found tour:", tour);
                } else {
                    console.log("Tour not found.");
                }
            })
            .catch(error => {
                console.error("Error finding tour:", error);
            });
    },
    updateTour: (req, res) => {
        const updateData = {
            name: "Unforgettable Thailand Tour",
            description: "Immerse yourself in the beauty and culture of Thailand."
        };

        Tour.findOneAndUpdate({ slug: "amazing-thailand-tour" }, updateData, { new: true })
            .then(updatedTour => {
                if (updatedTour) {
                    console.log("Updated tour:", updatedTour);
                } else {
                    console.log("Tour not found.");
                }
            })
            .catch(error => {
                console.error("Error updating tour:", error);
            });

    },
    deleteTour: (req, res) => {
        Tour.findOneAndDelete({ slug: "amazing-thailand-tour" })
            .then(deletedTour => {
                if (deletedTour) {
                    console.log("Deleted tour:", deletedTour);
                } else {
                    console.log("Tour not found.");
                }
            })
            .catch(error => {
                console.error("Error deleting tour:", error);
            });

    },

    tourByPlace: async (req, res) => {
        try {
            const { placeSlug } = req.params;

            // Find the parent place based on the provided place slug
            const parentPlace = await Place.findOne({ slug: placeSlug });

            if (!parentPlace) {
                return res.status(404).json({ error: 'Place not found.' });
            }

            // Find the tours that belong to the parent place or its children
            const tours = await Tour.find({
                $or: [
                    { places: parentPlace._id }, // Tours directly associated with the parent place
                    { places: { $in: parentPlace.children } } // Tours associated with the children places
                ]
            });

            return res.json({ tours });
        } catch (error) {
            console.error('Error fetching tours:', error);
            res.status(500).json({ error: 'Server error.' });
        }
    },
}
