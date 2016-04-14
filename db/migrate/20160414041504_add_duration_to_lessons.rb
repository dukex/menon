class AddDurationToLessons < ActiveRecord::Migration
  def change
    add_column :lessons, :duration, :integer
  end
end
