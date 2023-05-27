const Place = require("./model")
module.exports = {
    addPlaces: (req, res) => {
        const newPlaceData = {
            slug: "thailand",
            status: "published",
            coverImage: "https://example.com/thailand.jpg",
            placeType: "country",
            code: "TH",
            parent: null,
            geo: {
                type: "Point",
                coordinates: [13.7563, 100.5018]
            },
            view: 0,
            createDate: new Date(),
            updateDate: new Date(),
            name: "Thailand",
            description: "Beautiful country in Southeast Asia",
            content: "Thailand is known for its stunning beaches, rich culture, and delicious cuisine.",
            metadata: {
                title: "Thailand - The Land of Smiles",
                description: "Discover the beauty of Thailand and its vibrant culture."
            },
            faqs: [
                {
                    title: "Do I need a visa to visit Thailand?",
                    content: "It depends on your nationality. Please check with the Thai embassy or consulate in your country."
                },
                {
                    title: "What is the currency of Thailand?",
                    content: "The currency of Thailand is the Thai Baht (THB)."
                }
            ]
        };

        Place.create(newPlaceData)
            .then(place => {
                console.log("New place created:", place);
            })
            .catch(error => {
                console.error("Error creating place:", error);
            });

    },
    getPlaces: (req, res) => {
        // Find a place by slug
        Place.findOne({ slug: "thailand" })
            .then(place => {
                if (place) {
                    console.log("Found place:", place);
                } else {
                    console.log("Place not found.");
                }
            })
            .catch(error => {
                console.error("Error finding place:", error);
            });

    },

    updatePlaces: (req, res) => {
        // Update the name and description of a place
        const updateData = {
            name: "Kingdom of Thailand",
            description: "Experience the wonders of the Land of Smiles."
        };

        Place.findOneAndUpdate({ slug: "thailand" }, updateData, { new: true })
            .then(updatedPlace => {
                if (updatedPlace) {
                    console.log("Updated place:", updatedPlace);
                } else {
                    console.log("Place not found.");
                }
            })
            .catch(error => {
                console.error("Error updating place:", error);
            });

    },

    deletePlaces: (req, res) => {
        // Delete a place by slug
        Place.findOneAndDelete({ slug: "thailand" })
            .then(deletedPlace => {
                if (deletedPlace) {
                    console.log("Deleted place:", deletedPlace);
                } else {
                    console.log("Place not found.");
                }
            })
            .catch(error => {
                console.error("Error deleting place:", error);
            });

    },

    placeTree: async (req, res) => {
        try {
            // Fetch all places
            const places = await Place.find();

            // Function to recursively build the place tree
            const buildPlaceTree = (parentId) => {
                const children = places.filter(place => String(place.parent) === String(parentId));

                // Recursively build the tree for each child
                const tree = children.map(child => ({
                    ...child.toObject(),
                    children: buildPlaceTree(child._id)
                }));

                return tree;
            };

            // Build the place tree starting from the root (null parent)
            const placeTree = buildPlaceTree(null);
            return res.json({ placeTree });
        } catch (error) {
            console.error('Error fetching place tree:', error);
            res.status(500).json({ error: 'Server error.' });
        }
    }
}