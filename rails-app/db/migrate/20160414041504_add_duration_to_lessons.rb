class AddDurationToLessons < ActiveRecord::Migration[4.2]
  def change
    add_column :lessons, :duration, :integer
  end
end
