require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of :email }
    it { should have_secure_password }

    subject { create :user }

    it { should have_many :gifs }
  end
end
