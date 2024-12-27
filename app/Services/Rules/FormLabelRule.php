<?php

namespace App\Services\Rules;

use App\Services\Rules\Base\BaseAccessibilityRule;
use DOMDocument;

class FormLabelRule extends BaseAccessibilityRule
{
    public function __construct()
    {
        $this->guideline = new WCAGGuideline(
            '1.3.1',
            'Labels or Instructions',
            WCAGLevel::A,
            'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions'
        );
    }

    public function check(DOMDocument $dom): array
    {
        $issues = [];
        $xpath = new \DOMXPath($dom);

        // Query all form controls except hidden inputs
        $inputs = $xpath->query('//input[@type!="hidden"]|//select|//textarea');

        foreach ($inputs as $input) {
            // Ensure the node is a DOMElement
            if ($input instanceof \DOMElement) {
                // Check if the element has an 'id' attribute
                if (
                    !$input->hasAttribute('id') ||
                    !$xpath->query("//label[@for='{$input->getAttribute('id')}']")->length
                ) {
                    $issues[] = $this->createIssue(
                        'error',
                        'Form control missing associated label',
                        $input->getNodePath()
                    );
                }
            }
        }

        return $issues;
    }
}
