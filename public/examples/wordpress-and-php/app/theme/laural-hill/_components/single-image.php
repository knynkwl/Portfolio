<!-- /app/theme/laural-hill/_components -->

<?php
  $image = $template_args['image'];
  $orange_dot_text = $template_args['orange_dot_text'];
  $pattern = $template_args['pattern'];

  $section_spacing = $template_args['section_spacing'];

  if($section_spacing != 'half') {
    $section_spacing = 'pb-50 md:pb-100 md:mb-60';
  } else {
    $section_spacing = 'pb-48 md:pb-45';
  }
?>

<section class="c-content-single-image | <?php echo $section_spacing ?>">
  <div class="col-start-1 col-end-5 md:col-start-1 md:col-end-13 | md:hidden" data-scroll-reveal>
    <div class="c-pattern is-pattern-<?php echo $pattern ?>"></div>
  </div>

  <div class="o-container">
    <div class="grid grid-cols-4 md:grid-cols-12 gap-x-20 md:gap-x-36">
      <div class="col-start-1 col-end-5 md:col-start-2 md:col-end-12">
        <div class="image | relative z-1" data-scroll-reveal>
          <?php
            get_template_part_with_vars('_components/globals/image', [
              'image' => $image,
              'true_size' => true
            ])
          ?>

          <?php if($orange_dot_text): ?>
            <div class="c-orange-dot | bg-sunset overflow-hidden hidden md:flex items-center justify-center" data-scroll-reveal>
              <p class="text-style-subhead text-evergreen text-center"><?php echo $orange_dot_text ?></p>
            </div>
          <?php endif; ?>
        </div>
      </div>
      <div class="col-start-1 col-end-5 md:col-start-1 md:col-end-13 | hidden md:block " data-scroll-reveal>
        <div class="c-pattern is-pattern-<?php echo $pattern ?>"></div>
      </div>
    </div>
  </div>
</section>
