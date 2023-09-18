package eu.olympus.Times;

import org.miracl.core.BLS12461.BIG;
import org.miracl.core.BLS12461.ECP2;

public class ECP2Multiplier {
    public ECP2 mul(BIG e) {
        ECP2 result = new ECP2(); // Placeholder for the actual implementation
        return result; // Return the result of the multiplication
        //
        }

    public static void main(String[] args) {
        ECP2Multiplier ecp2Multiplier = new ECP2Multiplier();
        BIG e = new BIG(); // Initialize the BIG value for multiplication

        long startTime = System.nanoTime(); // Start time measurement

        ECP2 result = ecp2Multiplier.mul(e); // Call the mul() method to measure its execution time

        long endTime = System.nanoTime(); // End time measurement

        double elapsedTime = (endTime - startTime) / 1e6; // Calculate elapsed time in milliseconds

        System.out.println("Execution time: " + elapsedTime + " ms");
        System.out.println("Result: " + result); // Print the result of the multiplication
    }
}
