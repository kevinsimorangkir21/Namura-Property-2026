package seeds

import (
	"log"

	"namura-api/backend/models"

	"gorm.io/gorm"
)

// SeedProperties inserts legacy property data into the database.
// Only runs when the properties table is empty.
func SeedProperties(db *gorm.DB) {
	var count int64
	db.Model(&models.Property{}).Count(&count)

	if count > 0 {
		log.Println("[SEED] Properties already exist, skipping")
		return
	}

	properties := []models.Property{
		{
			Title:       "Lahan Strategis Pinggir Jalan Dekat Rumah Sakit Airan",
			Slug:        "lahan-strategis-pinggir-jalan-dekat-rumah-sakit-airan",
			Price:       1108250000,
			Type:        "jual",
			Status:      "Aktif",
			Location:    "Airan, Lampung Selatan",
			Description: "Lahan strategis siap bangun di pinggir jalan dekat RS Airan.",
			LandArea:    715,
			Image:       "/Asset/Properti1/Asset1.jpeg",
		},
		{
			Title:       "Lahan Strategis Siap Huni Di Perum Sejahtera Hajimena",
			Slug:        "lahan-strategis-siap-huni-di-perum-sejahtera-hajimena",
			Price:       492450000,
			Type:        "jual",
			Status:      "Aktif",
			Location:    "Lampung Selatan",
			Description: "Tanah siap bangun di perumahan strategis dekat kampus Poltekkes.",
			LandArea:    469,
			Image:       "/Asset/Properti2/Asset1.png",
		},
		{
			Title:       "Lahan Strategis Siap Huni Dekat Perum Bumi Asri Kedamaian",
			Slug:        "lahan-strategis-siap-huni-dekat-perum-bumi-asri-kedamaian",
			Price:       4340000000,
			Type:        "jual",
			Status:      "Aktif",
			Location:    "Bandar Lampung",
			Description: "Lahan yang sangat strategis dekat perumahan Bumi Asri Kedamaian.",
			Image:       "/Asset/Properti3/Asset1.png",
		},
		{
			Title:       "Lahan Siap Huni Strategis Dekat Pom Bensin Karang Anyar",
			Slug:        "lahan-siap-huni-strategis-dekat-pom-bensin-karang-anyar",
			Price:       47500000000,
			Type:        "jual",
			Status:      "Aktif",
			Location:    "Lampung Selatan",
			Description: "Lahan strategis pinggir jalan dekat pom bensin Karang Anyar.",
			LandArea:    50000,
			Image:       "/Asset/Properti4/Asset1.png",
		},
		{
			Title:       "Take Over Kredit Rumah Di Perumahan Natar Sejahtera",
			Slug:        "take-over-kredit-rumah-di-perumahan-natar-sejahtera",
			Price:       45000000,
			Type:        "jual",
			Status:      "Aktif",
			Location:    "Lampung Selatan",
			Description: "Rumah siap huni dengan take over kredit. Angsuran Rp 750.000/bulan.",
			Bedrooms:    2,
			Bathrooms:   1,
			LandArea:    77,
			Image:       "/Asset/Properti5/Asset1.png",
		},
	}

	for _, p := range properties {
		if err := db.Create(&p).Error; err != nil {
			log.Printf("[SEED] Failed to insert property '%s': %v", p.Title, err)
			continue
		}
	}

	log.Printf("[SEED] %d default properties inserted", len(properties))
}
