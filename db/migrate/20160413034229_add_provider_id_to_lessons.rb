class AddProviderIdToLessons < ActiveRecord::Migration
  def change
    add_column :lessons, :provider_id, :integer
    add_index :lessons, :provider_id
  end
end
