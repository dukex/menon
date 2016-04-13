class ChangeProviderIdToLessons < ActiveRecord::Migration
  def change
    change_column :lessons, :provider_id, :string
  end
end
