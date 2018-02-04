class StaticPagesController < ApplicationController
  @@roadmap = YAML.load_file(File.join(Rails.root, "lib", "roadmap.yml")).freeze

  def self.roadmap
    @@roadmap
  end

  def root
  end
end
