<?php
/**
 * @file
 * Contains \Drupal\test_twig\Controller\TestTwigController.
 */
 
namespace Drupal\structure_sync\Controller;
 
use Drupal\Core\Controller\ControllerBase;
 
class TestTwigController extends ControllerBase {
  public function content() {
 
    return [
      '#theme' => 'my_template',
      '#test_var' => $this->t('Test Value'),
    ];
 
  }

  public function showForm()
  {
    return $this->content();
  }
}
