<?php
// Firebase JWT verification helper
class FirebaseAuth {
    
    public static function verifyToken($idToken) {
        // In production, use Firebase Admin SDK or verify JWT
        // For now, we'll do basic validation
        
        if (empty($idToken)) {
            return false;
        }

        // Parse JWT (basic implementation)
        $parts = explode('.', $idToken);
        if (count($parts) !== 3) {
            return false;
        }

        try {
            $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
            
            if (!$payload || !isset($payload['user_id'])) {
                return false;
            }

            // Extract name from various possible fields
            $name = null;
            if (isset($payload['name'])) {
                $name = $payload['name'];
            } elseif (isset($payload['displayName'])) {
                $name = $payload['displayName'];
            } elseif (isset($payload['email'])) {
                // Extract name from email (before @)
                $name = explode('@', $payload['email'])[0];
            }

            return [
                'uid' => $payload['user_id'],
                'email' => $payload['email'] ?? null,
                'name' => $name,
                'picture' => $payload['picture'] ?? $payload['photoURL'] ?? null
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public static function getAuthHeader() {
        $headers = getallheaders();
        
        if (isset($headers['Authorization'])) {
            $auth = $headers['Authorization'];
            if (preg_match('/Bearer\s+(.*)$/i', $auth, $matches)) {
                return $matches[1];
            }
        }
        
        return null;
    }
}
