require 'rails_helper'

RSpec.describe "Api::V1::Gifs", type: :request do
  include ApiHelpers

  describe "GET /search" do
    let(:giphy_api_result) do
      OpenStruct.new(
        data: [
          OpenStruct.new(
            id: 'foo',
            images: OpenStruct.new(
              fixed_height: OpenStruct.new(url: 'http://test.com/foo')
            )
          )
        ]
      )
    end

    it "returns http success" do
      allow($giphy).to receive(:gifs_search_get).and_return giphy_api_result
      get "/api/v1/gifs/search?query=foo&page=3"
      expect(response).to have_http_status(:success)
    end

    context 'without a page param' do
      it 'is still a valid request' do
        allow($giphy).to receive(:gifs_search_get).and_return giphy_api_result
        get "/api/v1/gifs/search?query=foo"
        expect(response).to have_http_status(:success)
      end
    end

    context 'without a query param' do
      it 'responds with an unprocessable entity error' do
        allow($giphy).to receive(:gifs_search_get).and_return giphy_api_result
        get "/api/v1/gifs/search?page=3"
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "GET /users/:id/gifs" do
    let(:gifs) { create_list :gif, 3 }
    let(:user) { create :user }
    let(:headers) { { "ACCEPT" => "application/json" } }

    before { user.gifs << gifs }

    it "returns user\'s favorited gifs with http success code" do
      get "/api/v1/gifs", headers: authenticated_header(user).merge(headers)
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to match_array gifs.as_json
    end

    context 'without authentication' do
      it "returns http unauthorized error code" do
        get "/api/v1/gifs", headers: headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET /users/:id/gifs/favorite" do
    let!(:user) { create :user }
    let(:headers) { { "ACCEPT" => "application/json" } }
    let!(:params) do
      {
        external_id: Faker::Alphanumeric.alphanumeric(number: 16),
        title: Faker::Lorem.sentence,
        url_large: Faker::Internet.url,
        url_small: Faker::Internet.url
      }
    end
    let!(:gif) { create :gif, external_id: params[:external_id] }

    it "favorites the gif and returns http success code" do
      post "/api/v1/gifs/favorite",
        headers: authenticated_header(user).merge(headers), params: params
      expect(response).to have_http_status(:created)
      expect(user.favorites.last).to eq gif
    end

    context 'without authentication' do
      it "fails and returns http unauthorized error code" do
        post "/api/v1/gifs/favorite",
          headers: headers, params: params
        expect(response).to have_http_status(:unauthorized)
        expect(user.favorites).to be_empty
      end
    end

    context 'without gif existing in database' do
      let(:gif) { nil }

      it "creates and favorites the gif" do
        post "/api/v1/gifs/favorite",
          headers: authenticated_header(user).merge(headers), params: params
        expect(response).to have_http_status(:created)
        expect(user.favorites.last.external_id).to eq params[:external_id]
      end
    end
  end

end
