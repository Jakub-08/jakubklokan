---
layout: default
lang: en
title: "Blog | Jakub Klokan – badminton, training and sports journey"
description: "Articles about badminton tournaments, training, sports preparation and the journey of Jakub Klokan as a professional player."
---

<div class="main-bg">
  <h1 class="blog-intro-1">My badminton blog</h1>

  <div class="section-divider-1">
    <span></span>
  </div>

  <h2 class="blog-intro-2">
    Articles about badminton tournaments, training and the journey of an elite player.
  </h2>

  <p class="blog-language-note">
    Most blog articles are currently written in Czech. English versions may be added in the future. Thank you for your understanding.
  </p>


  <div id="filtr-panel" class="container">

    <div class="search-wrapper">

      <input
        type="text"
        id="vyhledavac"
        placeholder="{% if page.lang == 'en' %}🔍 Search articles...{% else %}🔍 Hledat články...{% endif %}"
      />

      <button id="clear-search" aria-label="Clear search">
        ×
      </button>

    </div>


    <div id="filtr-tagy"></div>

  </div>


  <div id="seznam-clanku" class="blog-list container"></div>

  <div id="paginace" class="container pagination"></div>

</div>


<div id="posts-data" style="display:none">
[
{% for post in site.posts %}
{
  "title": "{{ post.title | escape }}",
  "h1": "{{ post.h1 | default: post.title | escape }}",
  "summary": "{{ post.summary | escape }}",
  "url": "{{ post.url | relative_url }}",
  "date": "{{ post.date | date: '%Y-%m-%d' }}",
  "image": "{{ post.image | relative_url }}",
  "tags": [{% for tag in post.tags %}"{{ tag }}"{% if forloop.last == false %}, {% endif %}{% endfor %}]
}
{% if forloop.last == false %},{% endif %}
{% endfor %}
]
</div>


<script src="/blog/blog.js"></script>
<script src="/assets/js/scroll-animations.js"></script>