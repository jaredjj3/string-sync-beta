class Api::V1::NotationsController < ApplicationController
  def index
    @notations = Notation.includes(:tags, :transcriber).all
    render(:index, status: 200)
  end

  def show
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))
    render(:show, status: 200)
  end

  def create
    if authorized_to_create?
      @notation = Notation.create!(notation_params.merge(transcriber: current_user))
      render(:show, status: 200)
    else
      errors = [{ type: :error, messages: ["not authorized to create"] }]
      render(json: errors, status: 422)
    end
  end

  def update
    @notation = Notation.includes(:tags, :transcriber).find(params.require(:id))

    if authorized_to_update?(@notation)
      @notation.update!(notation_params)
      render(:show, status: 200)
    else
      errors = [{ type: :error, messages: ["not authorized to update"] }]
      render(json: errors, status: 422)
    end
  end

  def destroy
  end

  private

    def notation_params
      params.
          require(:notation).
          permit(
            :youtube_video_id,
            :thumbnail,
            :name,
            :artist_name,
            :vextab,
            :tempo,
            :dead_time,
            :duration,
            taggings_attributes: [:tag_id]
          )
    end

    def authorized_to_create?
      current_user.present? && current_user.has_role?(%i(admin teacher))
    end

    def authorized_to_update?(notation)
      current_user.present? &&
          (notation.transcriber == current_user || current_user.has_role?(:admin))
    end
end
