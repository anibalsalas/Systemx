package com.gestion.productos.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime; // Tiempo de expiración en milisegundos

    // Generar JWT
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Validar JWT
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extraer el nombre de usuario del token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Extraer los claims del token
    private Claims extractClaims(String token) {
        return Jwts.parser() // Asegúrate de que esto esté correcto
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    // Extraer la fecha de expiración
    private Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    // Validar si el token es válido
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}