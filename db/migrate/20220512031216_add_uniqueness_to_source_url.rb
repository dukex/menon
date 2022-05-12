class AddUniquenessToSourceUrl < ActiveRecord::Migration[7.0]
  def change
    add_index :courses, :source_url, unique: true
  end
end
