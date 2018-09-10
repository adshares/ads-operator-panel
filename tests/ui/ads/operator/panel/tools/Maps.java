package ui.ads.operator.panel.tools;
import java.util.HashMap;

public class Maps {

  private static HashMap<String, String> dashboard1;
  private static HashMap<String, String> dashboard2;
  private static HashMap<String, String> dashboard3;
  private static HashMap<String, String> dashboard4;
  private static HashMap<String, String> dashboard5;
  private static HashMap<String, String> dashboard6;
  private static HashMap<String, String> dashboard7;
  private static HashMap<String, Integer> id;

  public static void createDashboard() {
    dashboard1 = new HashMap<>();
    dashboard2 = new HashMap<>();
    dashboard3 = new HashMap<>();
    dashboard4 = new HashMap<>();
    dashboard5 = new HashMap<>();
    dashboard6 = new HashMap<>();
    dashboard7 = new HashMap<>();
  }
  public static void createId() {
    id = new HashMap<>();
  }

  public static void dashboard1(String name, String value) { dashboard1.put(name, value); }
  public static void dashboard2(String name, String value) { dashboard2.put(name, value); }
  public static void dashboard3(String name, String value) { dashboard3.put(name, value); }
  public static void dashboard4(String name, String value) { dashboard4.put(name, value); }
  public static void dashboard5(String name, String value) { dashboard5.put(name, value); }
  public static void dashboard6(String name, String value) { dashboard6.put(name, value); }
  public static void dashboard7(String name, String value) { dashboard7.put(name, value); }
  public static void id(String name, int value) { id.put(name, value);  }

  public static Object getDashboard1(String name) { return dashboard1.get(name); }
  public static Object getDashboard2(String name) { return dashboard2.get(name); }
  public static Object getDashboard3(String name) { return dashboard3.get(name); }
  public static Object getDashboard4(String name) { return dashboard4.get(name); }
  public static Object getDashboard5(String name) { return dashboard5.get(name); }
  public static Object getDashboard6(String name) { return dashboard6.get(name); }
  public static Object getDashboard7(String name) { return dashboard7.get(name); }
  public static Object getFromId(String name) { return id.get(name); }
}
