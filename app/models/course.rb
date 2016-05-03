class Course < ActiveRecord::Base
  has_many :lessons, -> { order('position ASC') }, dependent: :destroy

  belongs_to :owner, class_name: "User"

  validates :name, presence: true
end
