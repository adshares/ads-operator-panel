package ui.ads.operator.panel.pages.transaction;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.util.Objects;

public class TransactionPage {

//  Assert
  @FindBy(xpath = "//*[contains(text(), 'Id')]")                                                                        private WebElement IdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Block Id')]")                                                                  private WebElement BlockIdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Message Id')]")                                                                private WebElement MessageIdAssert;
  @FindBy(xpath = "//*[contains(text(), 'Sender Address')]")                                                            private WebElement SenderAddressAssert;
  @FindBy(xpath = "//*[contains(text(), 'Target Address')]")                                                            private WebElement TargetAddressAssert;
  @FindBy(xpath = "//*[contains(text(), 'Amount')]")                                                                    private WebElement AmountAssert;
  @FindBy(xpath = "//*[contains(text(), 'Sender Fee')]")                                                                private WebElement SenderFeeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Size')]")                                                                      private WebElement SizeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Type')]")                                                                      private WebElement TypeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Time')]")                                                                      private WebElement TimeAssert;
  @FindBy(xpath = "//*[contains(text(), 'Failed to fetch')]")                                                           private WebElement FailedToFetchAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=desc')]")                                                          private WebElement SortIdOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=id&order=asc')]")                                                           private WebElement SortIdOrderAscAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=block_id&order=desc')]")                                                    private WebElement SortBlockOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=block_id&order=asc')]")                                                     private WebElement SortBlockOrderAscAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=type&order=desc')]")                                                        private WebElement SortTypeOrderDescAssert;
  @FindBy(xpath = "//*[contains(@href,'sort=type&order=asc')]")                                                         private WebElement SortTypeOrderAscAssert;
  //Button
  @FindBy(xpath = "//*[contains(text(), 'Table')]")                                                                     private WebElement Table;
  @FindBy(xpath = "//*[contains(text(), 'Code')]")                                                                      private WebElement Code;
  @FindBy(xpath = "//section//div[2]//button")                                                                          private WebElement Copy;
  @FindBy(xpath = "//*[contains(text(), 'Previous')]")                                                                  private WebElement Previous;
  @FindBy(xpath = "//*[contains(text(), 'Next')]")                                                                      private WebElement Next;
  @FindBy(xpath = "//*[contains(text(), 'Transactions')]")                                                              private WebElement Transactions;
  //  @FindBy(xpath = "//*[@class='pagination justify-content-center flex-wrap']//descendant::span[3]")                     private WebElement ThreeDots;
  @FindBy(xpath = "//*[@class='pagination justify-content-center flex-wrap']//descendant::span[contains(text(), '...')]") private WebElement ThreeDots;
  @FindBy(xpath = "//section//thead//th//span[contains(text(), 'Id')]")                                                 private WebElement NodesId;
  @FindBy(xpath = "//section//thead//th//span[contains(text(), 'Block')]")                                              private WebElement Block;
  @FindBy(xpath = "//section//thead//th//span[contains(text(), 'Type')]")                                               private WebElement Type;
  //  Accounts
  @FindBy(xpath = "//section//th//span[contains(text(), 'Account Id')]")                                                private WebElement AccountIdAssert;
  @FindBy(xpath = "//section//th//span[contains(text(), 'Balance')]")                                                   private WebElement AccountBalanceAssert;
  @FindBy(xpath = "//section//th//span[contains(text(), 'Status')]")                                                    private WebElement AccountStatusAssert;
  @FindBy(xpath = "//section//th//span[contains(text(), 'Public Key')]")                                                private WebElement AccountPublicKeyAssert;

  @FindBy(xpath = "//*[td][1]//div//div//*//*")                                                                         private WebElement ikon_status;

  private WebDriver driver;
  private WebDriverWait wait;

  public TransactionPage(WebDriver driver) {
    this.driver = driver;
    wait = new WebDriverWait(driver, 60);
    PageFactory.initElements(driver, this);
  }

  public void detailedDataTransaction () {
    wait.until(ExpectedConditions.visibilityOf(IdAssert));
    Assert.assertEquals("Id", IdAssert.getText());
    System.out.print("Assert - Id, ");
    wait.until(ExpectedConditions.visibilityOf(BlockIdAssert));
    Assert.assertEquals("Block Id", BlockIdAssert.getText());
    System.out.print("Block Id, ");
    wait.until(ExpectedConditions.visibilityOf(MessageIdAssert));
    Assert.assertEquals("Message Id", MessageIdAssert.getText());
    System.out.print("Message Id, ");
    wait.until(ExpectedConditions.visibilityOf(SenderAddressAssert));
    Assert.assertEquals("Sender Address", SenderAddressAssert.getText());
    System.out.print("Sender Address, ");
    wait.until(ExpectedConditions.visibilityOf(TargetAddressAssert));
    Assert.assertEquals("Target Address", TargetAddressAssert.getText());
    System.out.print("Target Address, ");
    wait.until(ExpectedConditions.visibilityOf(AmountAssert));
    Assert.assertEquals("Amount", AmountAssert.getText());
    System.out.print("Amount, ");
    wait.until(ExpectedConditions.visibilityOf(SenderFeeAssert));
    Assert.assertEquals("Sender Fee", SenderFeeAssert.getText());
    System.out.print("Sender Fee, ");
    wait.until(ExpectedConditions.visibilityOf(SizeAssert));
    Assert.assertEquals("Size", SizeAssert.getText());
    System.out.print("Size, ");
    wait.until(ExpectedConditions.visibilityOf(TypeAssert));
    Assert.assertEquals("Type", TypeAssert.getText());
    System.out.print("Type, ");
    wait.until(ExpectedConditions.visibilityOf(TimeAssert));
    Assert.assertEquals("Time", TimeAssert.getText());
    System.out.print("Time");

    copyCode();
  }

  public void  searchTransactionNoPosition () {
    wait.until(ExpectedConditions.visibilityOf(FailedToFetchAssert));
    Assert.assertEquals("Failed to fetch", FailedToFetchAssert.getText());
    System.out.println("Assert - Failed to fetch");
  }

  public void sortingTransactions() {
    wait.until(ExpectedConditions.visibilityOf(SortBlockOrderAscAssert));
    wait.until(ExpectedConditions.visibilityOf(NodesId));
    NodesId.click();
    System.out.println("Assert 1 - SortIdOrderDesc");
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortIdOrderAscAssert));
    System.out.println("Assert 2 - SortIdOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(NodesId));
    NodesId.click();
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortBlockOrderAscAssert));
    System.out.println("Assert 3 - SortBlockOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(Block));
    Block.click();
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortBlockOrderDescAssert));
    System.out.println("Assert 4 - SortBlockOrderDesc");
    wait.until(ExpectedConditions.visibilityOf(Block));
    Block.click();
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortTypeOrderDescAssert));
    System.out.println("Assert 5 - SortTypeOrderDesc");
    wait.until(ExpectedConditions.visibilityOf(Type));
    Type.click();
    nextPrevious();

    wait.until(ExpectedConditions.visibilityOf(SortTypeOrderAscAssert));
    System.out.println("Assert 6 - SortTypeOrderAsc");
    wait.until(ExpectedConditions.visibilityOf(Type));
    Type.click();
    nextPrevious();

  }
  private void nextPrevious() {
    if(!driver.findElements(By.xpath("//*[@class='pagination justify-content-center flex-wrap']//descendant::span[3]")).isEmpty()){
      System.out.println("---------- nextPrevious ----------");
      String url=driver.getCurrentUrl();
      System.out.println(url);
      wait.until(ExpectedConditions.visibilityOf(IdAssert));
      wait.until(ExpectedConditions.visibilityOf(Previous));
      wait.until(ExpectedConditions.visibilityOf(ThreeDots));
      wait.until(ExpectedConditions.visibilityOf(Next));
      Next.click();
      url=driver.getCurrentUrl();
      System.out.println(url);
      if(!driver.findElements(By.xpath("//*[@class='pagination justify-content-center flex-wrap']//descendant::span[2]")).isEmpty()){
        wait.until(ExpectedConditions.visibilityOf(IdAssert));
        wait.until(ExpectedConditions.visibilityOf(Previous));
        wait.until(ExpectedConditions.visibilityOf(ThreeDots));
        wait.until(ExpectedConditions.visibilityOf(Next));
        Next.click();
        url=driver.getCurrentUrl();
        System.out.println(url);
        wait.until(ExpectedConditions.visibilityOf(IdAssert));
        wait.until(ExpectedConditions.visibilityOf(Next));
        wait.until(ExpectedConditions.visibilityOf(Previous));
        Previous.click();
      }else{
        System.out.println(url);
        System.out.println("Skip >>>>> no page 3");
      }
      wait.until(ExpectedConditions.visibilityOf(IdAssert));
      wait.until(ExpectedConditions.visibilityOf(Next));
      wait.until(ExpectedConditions.visibilityOf(Previous));
      Previous.click();
    }else{
      String url=driver.getCurrentUrl();
      System.out.println(url);
      System.out.println("Skip >>>>> no page 2");
    }
  }

  private void copyCode() {
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
    wait.until(ExpectedConditions.visibilityOf(Code));
    Code.click();
    System.out.println("Click - Code");
    wait.until(ExpectedConditions.visibilityOf(Copy));
    Copy.click();
    System.out.println("Click - Copy");
  }

  public void iconTransactions() {
    wait.until(ExpectedConditions.visibilityOf(ikon_status));
    iconTransactionsFor(25, "asc");
    wait.until(ExpectedConditions.visibilityOf(IdAssert));
    IdAssert.click();
    System.out.println("Click - IdAssert");
    iconTransactionsFor(25, "desc");
    wait.until(ExpectedConditions.visibilityOf(ikon_status));
  }
  private void iconTransactionsFor(int max,String order) {
    for (int s = 1; s < max; s++) {
      wait.until(ExpectedConditions.visibilityOf(ikon_status));

      String Nodes_id = String.format("//tr[%s]//td//div//a", s);
      String id = driver.findElement(By.xpath(Nodes_id)).getText();
      System.out.println("Id:     " + id);

      String Nodes_icon = String.format("//*[td][%s]//div//div//*//*", s);
      String icon_1 = driver.findElement(By.xpath(Nodes_icon)).getAttribute("d");
      if (Objects.equals(icon_1, "M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z")){
        icon_1="send one";
      }
      if (Objects.equals(icon_1, "M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z")){
        icon_1="create account";
      }
      System.out.println("Icon_1: " + icon_1);

      driver.findElement(By.xpath(Nodes_id)).click();

      wait.until(ExpectedConditions.visibilityOf(IdAssert));
      String icon_2 = driver.findElement(By.xpath("//tr//div//div//*//*")).getAttribute("d");
      if (Objects.equals(icon_2, "M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z")){
        icon_2="send one";
      }
      if (Objects.equals(icon_2, "M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z")){
        icon_2="create account";
      }
      System.out.println("Icon_2: " + icon_2);

      if (Objects.equals(icon_1, icon_2)) {
        System.out.println(">>>>> Pass");
      } else {
        System.out.println(">>>>> Fail");
      }
      Assert.assertEquals(icon_1, icon_2);

      if (Objects.equals(order, "desc")) {
        wait.until(ExpectedConditions.visibilityOf(Transactions));
        Transactions.click();
        wait.until(ExpectedConditions.visibilityOf(IdAssert));
        IdAssert.click();
      } else {
        wait.until(ExpectedConditions.visibilityOf(Transactions));
        Transactions.click();
      }
    }
  }
}
