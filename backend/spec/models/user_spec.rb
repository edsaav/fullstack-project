require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of :email }
    it { should have_secure_password }

    subject { create :user }

    it { should have_many :gifs }
  end

  describe '#favorites' do
    let(:gifs) { create_list :gif, 3 }
    let(:user) { create :user }

    before { user.gifs << gifs }

    it 'returns the user\'s favorited gifs' do
      expect(user.favorites).to match_array gifs
    end
  end

  describe '#add_favorite' do
    let(:user) { create :user }
    let!(:params) do
      {
        external_id: Faker::Alphanumeric.alphanumeric(number: 16),
        title: Faker::Lorem.sentence,
        url_large: Faker::Internet.url,
        url_small: Faker::Internet.url
      }
    end

    it 'should persist the gif and add it to the user\'s favorites' do
      user.add_favorite params
      expect(Gif.find_by(external_id: params[:external_id])).to be_persisted
      expect(user.gifs.last.external_id).to eq params[:external_id]
    end

    context 'with existing persisted gif' do
      let!(:gif) { create :gif, external_id: params[:external_id] }

      it 'add the gif to the user\'s favorites' do
        user.add_favorite params
        expect(user.gifs.last.external_id).to eq gif.external_id
      end

      context 'already added as favorite' do
        before { user.gifs << gif }
  
        it 'should do nothing' do
          user.add_favorite params
          expect(user.gifs.count).to eq 1
        end
      end
    end
  end
end
