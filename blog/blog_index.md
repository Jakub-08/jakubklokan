---
layout: default
title: "Blog Jakuba Klokana – badminton, trénink, turnaje a sportovní příprava"
description: "Blog vrcholového badmintonisty Jakuba Klokana. Články o tréninku, turnajích, sportovní přípravě a zkušenostech z kariéry."
---

<div class="main-bg">

  <h1 class="blog-intro-1">
    Můj badmintonový blog
  </h1>

  <div class="separate-line separate-line-blog"></div>

  <h2 class="blog-intro-2">
    Pravidelné články o turnajích, tréninku a sportovní přípravě.
  </h2>

  <!-- FILTR -->
  <div id="filtr-panel" class="container">
    <input type="text" id="vyhledavac" placeholder="Hledat podle názvu…" />
    <div id="filtr-tagy"></div>
  </div>

  <!-- SEO VÝPIS ČLÁNKŮ (DŮLEŽITÉ) -->
  <div id="seznam-clanku" class="blog-list container">

    {% for post in site.posts %}
      <article class="blog-card"
               data-title="{{ post.title | downcase }}"
               data-tags="{% for tag in post.tags %}{{ tag | downcase }} {% endfor %}">

        <a href="{{ post.url | relative_url }}">

          {% if post.image %}
            <img src="{{ post.image | relative_url }}"
                 alt="{{ post.title }}"
                 loading="lazy">
          {% endif %}

          <h3>{{ post.h1 }}</h3>

          {% if post.des %}
            <p>{{ post.des }}</p>
          {% endif %}

          <small>{{ post.date | date: "%d.%m.%Y" }}</small>

        </a>
      </article>
    {% endfor %}

  </div>

</div>

<script src="/blog/blog.js"></script>