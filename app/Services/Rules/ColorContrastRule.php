<?php

namespace App\Services\Rules;

use DOMDocument;

class ColorContrastRule implements AccessibilityRuleInterface
{
    public function check(DOMDocument $dom): array
    {
        // Note: This is a simplified version. A real implementation would need
        // to parse CSS and calculate actual color contrast ratios
        $issues = [];
        $elements = $dom->getElementsByTagName('*');

        foreach ($elements as $element) {
            // Ensure the node is an instance of DOMElement
            if ($element instanceof \DOMElement) {
                if ($element->hasAttribute('style')) {
                    $style = $element->getAttribute('style');
                    if (strpos($style, 'color') !== false || strpos($style, 'background') !== false) {
                        $issues[] = [
                            'type' => 'warning',
                            'message' => 'Element uses inline styles - verify color contrast meets WCAG guidelines',
                            'element' => $element->getNodePath()
                        ];
                    }
                }
            }
        }

        return $issues;
    }
}
