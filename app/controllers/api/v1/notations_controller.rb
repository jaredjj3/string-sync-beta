class Api::V1::NotationsController < ApplicationController
  def index
    # TODO: Implement checking fetched_at and only return notations fetched after fetched_at
    @notations = Notation.includes(:tags, :transcriber).where(featured: true)
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

    def authorized_to_create?
      logged_in? && (current_user.has_role?(:teacher) || current_user.has_role?(:admin))
    end

    def authorized_to_update?(notation)
      logged_in? && (current_user == notation.transcriber || current_user.try(:has_role?, :admin))
    end

    def notation_params
      current_user.try(:has_role?, :admin) ? admin_notation_params : non_admin_notation_params
    end

    def admin_notation_params
      params.
          require(:notation).
          permit(
            :youtube_video_id,
            :thumbnail,
            :song_name,
            :artist_name,
            :vextab_string,
            :bpm,
            :dead_time_ms,
            :duration_ms,
            :featured # admins only
          )
    end

    def non_admin_notation_params
      params.
          require(:notation).
          permit(
            :youtube_video_id,
            :thumbnail,
            :song_name,
            :artist_name,
            :vextab_string,
            :bpm,
            :dead_time_ms,
            :duration_ms
          )
    end
end
