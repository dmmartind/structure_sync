<?php

namespace Drupal\structure_sync\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
  use Drupal\Core\Link;
  

/**
 * Import and export form for content in structure, like taxonomy terms.
 */
class StructureSyncForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'structure_sync';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'structure_sync.data',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['title'] = [
      '#type' => 'page_title',
      '#title' => $this->t('Forms'),
    ];

    $log = $this->config('structure_sync.data')->get('log');

    if ($log === NULL) {
      $log = TRUE;
    }

    $header = [
      'title' => t('Title'),
      'desc' => t('Description'),
      'ops' => t('Operations'),
    ];

    //$url = Url::fromRoute('structure_sync.showForm');

    $rows[0] = [
      'edit_link' => [
        'class' => 'edit_link',
        'data' => [
          '#type' => 'link',
          '#url' => Url::fromRoute('structure_sync.showForm'),
          '#title' => 'test',
        ],
      ],
    ];


    $output[0] = [
      'title' => $rows[0],
      'desc'  => "Default form layout",
      'ops'   => ""
    ];

    $form['table'] = [
      '#type' => 'tableselect',
      '#header' => $header,
      '#options' => $output,
      '#empty' => t('No users found'),
      ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('structure_sync.data')
      ->set('log', $form_state->getValue('log'))
      ->save();
  }

}
