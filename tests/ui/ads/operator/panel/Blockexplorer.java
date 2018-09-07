package ui.ads.operator.panel;

import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import ui.ads.operator.panel.pages.DashboardPage;
import ui.ads.operator.panel.pages.node.NodePage;
import ui.ads.operator.panel.setup.BrowserTestCase;

public class Blockexplorer extends BrowserTestCase {



  private String url="https://operator.e11.click/blockexplorer";
  private String url_wiremock="http://localhost:3000/blockexplorer";
  private String search_node_0="0000";
  private String search_node_1="0001";
  private String search_node_3="0003";

  private DashboardPage dashboardPage;
  private NodePage nodePage;

  @BeforeTest
  public void setUp() {
  }


  @Test
  public void dashboard() {
    System.out.println("---------- dashboard ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.dashboard(url);
  }

  @Test
  public void dashboard_WM() {
    System.out.println("---------- dashboard_wiremock ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.dashboard(url_wiremock);
  }

  @Test
  public void firstNode() {
    System.out.println("---------- firstNode ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.firstNode();
  }
  @Test
  public void viewAllNode() {
    System.out.println("---------- viewAllNode ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.viewAllNode();
  }

  @Test
  public void firstFrom() {
    System.out.println("---------- firstFrom ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.firstFrom();
  }
  @Test
  public void search() {
    System.out.println("---------- search ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_1);
  }

  @Test
  public void detailedDataNode() {
    System.out.println("---------- TC_1 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_1);
    nodePage = new NodePage(driver);
    nodePage.detailedDataNode();
  }
  @Test
  public void sortingAccountsInNode() {
    System.out.println("---------- TC_2 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_1);
    nodePage = new NodePage(driver);
    nodePage.sortingSccountsInNode();
  }
  @Test
  public void searchForANode() {
    System.out.println("---------- TC_3 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_3);
    nodePage = new NodePage(driver);
    nodePage.searchForANode();
  }
  @Test
  public void nodeSearchnNoPosition() {
    System.out.println("---------- TC_4 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_0);
    nodePage = new NodePage(driver);
    nodePage.nodeSearchnNoPosition();
  }
  @Test
  public void sortingNodes() {
    System.out.println("---------- TC_5 ----------");
    nodePage = new NodePage(driver);
    nodePage.sortingNodes();
  }
}
