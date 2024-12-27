<?php

namespace App\Services\Rules;

use DOMDocument;
use DOMXPath;

class AriaLabelRule implements AccessibilityRuleInterface
{
    public function check(DOMDocument $dom): array
    {
        $issues = [];
        $xpath = new DOMXPath($dom);
        
        // Check interactive elements for aria-label or aria-labelledby
        $elements = $xpath->query('//*[@role="button" or @role="link" or self::button or self::a]');
        
        foreach ($elements as $element) {
            if (!$element->hasAttribute('aria-label') && 
                !$element->hasAttribute('aria-labelledby') &&
                !$element->textContent) {
                $issues[] = [
                    'type' => 'error',
                    'message' => 'Interactive element missing accessible name',
                    'element' => $element->getNodePath()
                ];
            }
        }

        return $issues;
    }
}