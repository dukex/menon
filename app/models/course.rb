class Course < ActiveRecord::Base
  has_many :lessons

  validates :name, presence: true
end
