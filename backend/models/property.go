package models

import "time"

// Property represents a real estate listing
type Property struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Title        string    `gorm:"size:255;not null" json:"title"`
	Slug         string    `gorm:"size:200;uniqueIndex" json:"slug"`
	Price        float64   `gorm:"not null" json:"price"`
	Type         string    `gorm:"size:100;not null" json:"type"`
	Status       string    `gorm:"size:50;not null" json:"status"`
	Location     string    `gorm:"size:255;not null" json:"location"`
	Bedrooms     int       `gorm:"default:0" json:"bedrooms"`
	Bathrooms    int       `gorm:"default:0" json:"bathrooms"`
	Garage       int       `gorm:"default:0" json:"garage"`
	BuildingArea float64   `gorm:"default:0" json:"building_area"`
	LandArea     float64   `gorm:"default:0" json:"land_area"`
	Description  string    `gorm:"size:5000" json:"description"`
	Image        string    `gorm:"size:500" json:"image"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
