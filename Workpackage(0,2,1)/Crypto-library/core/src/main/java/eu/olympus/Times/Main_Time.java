package eu.olympus.Times;//package Times;
//
//import org.miracl.core.BLS12461.BIG;
//import org.miracl.core.BLS12461.DBIG;
//import org.miracl.core.BLS12461.FP2;
//
//public class Main_Time {
//    private final FP2 fp2; // dilwsi metablitis FP2 class
//    volatile int i=0;//na ektelei ola ta vimata to for loop
//
//    public Main_Time() {
//        // kanoume arxikopoiisi tis metablitis me kapoies times
//        this.fp2 = new FP2(new BIG(1),new BIG(2));
//    }
//
//
//    public void run() {
//        FP2 y = new FP2(new BIG(3),new BIG(4)); //dimiourgia mia allis periptwsis FP2
//
//        long startTime = System.currentTimeMillis(); //
//        BIG C_buffer=new BIG(0);
//        BIG D_buffer=new BIG(0);
//        DBIG F_buffer= new DBIG(0);
//
//        for (i = 0; i < 100000; i++) {
//            this.fp2.fast_mul(y); // kalesma methodou mul 100.000
//        }
//        long endTime = System.currentTimeMillis(); // trexousa wra se nanotime
//        double elapsedTime = (endTime - startTime)/1000.0; // convert nanoseconds to seconds
//        System.out.println("Elapsed time: " + elapsedTime + " in seconds");
//        System.out.println("Time operation: "+ (elapsedTime/100000.0)*1000);
//    }
//
//    public static void main(String[] args) {
//        Main_Time main = new Main_Time(); //
//        main.run(); //
//    }
//}
