require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:courses).with_foreign_key(:owner_id) }
end
