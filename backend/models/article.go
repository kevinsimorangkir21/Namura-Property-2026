package models

import "time"

// Article represents a blog/content entry
type Article struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `gorm:"size:255;not null" json:"title"`
	Slug      string    `gorm:"size:200;uniqueIndex" json:"slug"`
	Thumbnail string    `gorm:"size:500" json:"thumbnail"`
	Excerpt   string    `gorm:"size:500" json:"excerpt"`
	Content   string    `gorm:"type:text;not null" json:"content"`
	Status    string    `gorm:"size:50;not null" json:"status"`
	AuthorID  uint      `gorm:"not null" json:"author_id"`
	Author    User      `gorm:"foreignKey:AuthorID" json:"author,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
