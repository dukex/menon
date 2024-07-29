class AddProviderIdToLessons < ActiveRecord::Migration[4.2]
  def change
    add_column :lessons, :provider_id, :integer
    add_index :lessons, :provider_id
  end
end
