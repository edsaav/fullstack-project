require 'rails_helper'

RSpec.describe UsersGif, type: :model do
  describe 'validations' do
    it { should validate_presence_of :user_id }
    it { should validate_presence_of :gif_id }

    subject { create :users_gif }

    it { should belong_to :user }
    it { should belong_to :gif }
    it { should have_db_index [:user_id, :gif_id] }
  end
end
