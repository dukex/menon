class AddPositionToLessons < ActiveRecord::Migration[4.2]
  def change
    add_column :lessons, :position, :integer
  end
end
