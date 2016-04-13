class Course < ActiveRecord::Base
  has_many :lessons, -> { order('position ASC') }

  validates :name, presence: true
end
