require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do

  describe "POST /" do
    let(:email) { Faker::Internet.email }
    let(:password) { Faker::Alphanumeric.alphanumeric(number: 10) }
    let(:headers) { { "ACCEPT" => "application/json" } }
    let(:params) { { email: email, password: password } }

    it "returns http success" do
      post "/api/v1/users", params: params, headers: headers
      expect(response).to have_http_status(:created)
    end

    context 'without an email param' do
      let(:params) { { password: password } }

      it "responds with an unprocessable entity error" do
        post "/api/v1/users", params: params, headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'without a password param' do
      let(:params) { { email: email } }

      it "responds with an unprocessable entity error" do
        post "/api/v1/users", params: params, headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with user email already taken' do
      let!(:existing_user) { create :user, email: email }

      it "responds with a conflicting resource error" do
        post "/api/v1/users", params: params, headers: headers
        expect(response).to have_http_status(:conflict)
        expect(response.body).to include 'Email has already been taken'
      end
    end
  end

end
